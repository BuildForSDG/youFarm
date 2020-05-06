import User from '../models/user';
import { trimString, isEmpty, currentTimestamp, decodeJWToken } from '../utils/helper';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class UserClass {
    async login(req, res) {
        try {
            let { email, password } = req.body;
            const data = await User.findOne({
                email: email
            });

            if (!data)
                return res.status(404).json({
                    status: false,
                    message: 'User details does not exists'
                });

            let userDetails = {
                id: data._id,
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                phone: data.phone,
                gender: data.gender,
                state: data.state,
                city: data.city,
                address: data.address,
                created_at: data.created_at,
                updated_at: data.updated_at
            };

            const passwordCheck = bcrypt.compareSync(password, data.password);

            if (!passwordCheck)
                return res.status(200).json({
                    status: false,
                    message: 'Incorrect login details.'
                });

            //set jwt token
            const payload = { user: data._id };
            const options = {
                expiresIn: process.env.JWT_MAX_AGE,
                algorithm: process.env.JWT_ALGORITHM
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, options);

            res.status(201).json({
                status: true,
                message: 'Login successful',
                data: userDetails,
                token: token
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to login. Please try again.'
            });
        }
    }

    async register(req, res) {
        try {
            let {
                first_name,
                last_name,
                email,
                phone,
                gender,
                state,
                city,
                address,
                password,
                password_confirmation
            } = req.body;
            const created_at = currentTimestamp();
            let { email_exists, phone_exists, password_match } = false;

            const requiredValues = [first_name, last_name, email, phone, password, password_confirmation];
            const isValueEmpty = isEmpty(requiredValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields.'
                });

            const check_email = await User.findOne({ email: trimString(email.toLowerCase()) }, { email: 1 });
            const check_phone = await User.findOne({ phone: phone }, { phone: 1 });

            password_match = password != password_confirmation ? false : true;
            email_exists = check_email ? true : false;
            phone_exists = check_phone ? true : false;

            if (!password_match)
                return res.status(200).json({
                    status: false,
                    message: 'Password does not match.'
                });

            if (email_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Email already in use by another user.'
                });

            if (phone_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Phone number already in use by another user.'
                });

            const salt = bcrypt.genSaltSync(10);

            const data = {
                first_name: first_name,
                last_name: last_name,
                email: trimString(email.toLowerCase()),
                phone: phone,
                gender: gender,
                state: state,
                city: city,
                address: address,
                password: bcrypt.hashSync(password, salt),
                created_at,
                updated_at: created_at
            };

            const newUser = new User(data);

            newUser
                .save()
                .then(async(data) => {
                    const details = await User.findOne({ _id: data._id }, { password: 0 });
                    res.status(201).json({
                        status: true,
                        message: 'User successfully added.',
                        data: details
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occured. Unable to add user. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to add user. Try again.' + error
            });
        }
    }

    async updateUserProfile(req, res) {
        try {
            const token = req.body.token || req.params.token || req.headers['x-access-token'];
            const logged_user = decodeJWToken(token, 'user');

            let { first_name, last_name, phone, gender, state, city, address } = req.body;
            let { phone_exists } = false;

            const allValues = [first_name, last_name, phone, gender, state, city, address];
            const isValueEmpty = isEmpty(allValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields'
                });

            const check_phone = await User.findOne({ phone: trimString(phone), deleted: false, _id: { $ne: logged_user } }, { phone: 1 });
            phone_exists = check_phone ? true : false;

            if (phone_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Phone number exists for another user'
                });

            User.findByIdAndUpdate(logged_user, {
                    $set: {
                        first_name: first_name,
                        last_name: first_name,
                        phone: phone,
                        gender: gender,
                        state: state,
                        city: city,
                        address: address
                    }
                })
                .then((data) => {
                    res.status(201).json({
                        status: true,
                        message: 'Your profile was updated.'
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        message: 'Your profile was not updated. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Your profile was not updated. Try again.'
            });
        }
    }
}
module.exports = UserClass;