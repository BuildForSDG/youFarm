import Admin from '../models/admin';
import User from '../models/user';
import {
    trimString,
    isEmpty,
    currentTimestamp,
    decodeJWToken
} from '../utils/helper';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

class AdminClass {
    async login(req, res) {
        try {
            let {
                email,
                password
            } = req.body;
            const data = await Admin.findOne({
                email: email
            });

            if (!data)
                return res.status(200).json({
                    status: false,
                    message: 'Admin details does not exists'
                });

            let adminDetails = {
                id: data._id,
                first_name: data.first_name,
                last_name: data.last_name,
                email: data.email,
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
            const payload = {
                admin: data._id
            };
            const options = {
                expiresIn: process.env.JWT_MAX_AGE,
                algorithm: process.env.JWT_ALGORITHM
            };

            const token = jwt.sign(payload, process.env.JWT_SECRET, options);

            res.status(201).json({
                status: true,
                message: 'Login successful',
                admin: adminDetails,
                token: token
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to login. Please try again.'
            });
        }
    }

    async add(req, res) {
        try {
            let {
                first_name,
                last_name,
                email,
                password,
                password_confirmation
            } = req.body;
            const created_at = currentTimestamp();
            let {
                email_exists,
                password_match
            } = false;

            const requiredValues = [first_name, last_name, email, password, password_confirmation];
            const isValueEmpty = isEmpty(requiredValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields.'
                });

            const check_email = await Admin.findOne({
                email: trimString(email.toLowerCase())
            }, {
                email: 1
            });

            password_match = password != password_confirmation ? false : true;
            email_exists = check_email ? true : false;

            if (!password_match)
                return res.status(200).json({
                    status: false,
                    message: 'Password does not match.'
                });

            if (email_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Email already in use by another admin.'
                });

            const salt = bcrypt.genSaltSync(10);

            const data = {
                first_name: first_name,
                last_name: last_name,
                email: trimString(email.toLowerCase()),
                password: bcrypt.hashSync(password, salt),
                created_at,
                updated_at: created_at
            };

            const newAdmin = new Admin(data);

            newAdmin
                .save()
                .then(async (data) => {
                    const details = await Admin.findOne({
                        _id: data._id
                    }, {
                        password: 0
                    });
                    res.status(201).json({
                        status: true,
                        message: 'Admin successfully added.',
                        data: details
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occured. Unable to add admin. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to add admin. Try again.'
            });
        }
    }

    async allAdmins(req, res) {
        try {
            const token = req.body.token || req.params.token || req.headers['x-access-token'];
            const logged_admin = decodeJWToken(token, 'admin');
            const admins = await Admin.find({
                _id: {
                    $ne: logged_admin
                }
            }, {
                password: 0
            }).sort({
                _id: -1
            });

            if (admins.length > 0) {
                return res.status(200).json({
                    status: true,
                    data: admins
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: 'No admin yet.'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Unable to retrieve all admin.'
            });
        }
    }

    async delete(req, res) {
        try {
            const token = req.body.token || req.params.token || req.headers['x-access-token'];
            const logged_admin = decodeJWToken(token, 'admin');
            const {
                admin_id
            } = req.params;
            let {
                admin_exists
            } = false;

            if (!admin_id)
                return res.status(404).json({
                    status: false,
                    message: 'Admin details does not exists.'
                });

            const checkAdmin = admin_id == logged_admin ? true : false;

            if (checkAdmin)
                return res.status(200).json({
                    status: false,
                    message: 'You cannot delete your account.'
                });

            const check_admin = await Admin.findOne({
                _id: admin_id
            });
            admin_exists = check_admin ? true : false;

            if (!admin_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Admin details does not exists.'
                });

            Admin.findByIdAndDelete(admin_id)
                .then((data) => {
                    res.status(201).json({
                        status: true,
                        message: 'Admin successfully deleted.'
                    });
                })
                .catch((error) => {
                    res.status(200).json({
                        status: false,
                        message: 'An error occured. Unable to delete admin. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to delete admin. Try again.'
            });
        }
    }

    async updateAdminProfile(req, res) {
        try {
            const token = req.body.token || req.params.token || req.headers['x-access-token'];
            const logged_admin = decodeJWToken(token, 'admin');

            const updated_at = currentTimestamp();

            let {
                first_name,
                last_name
            } = req.body;

            const allValues = [first_name, last_name];
            const isValueEmpty = isEmpty(allValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields'
                });

            Admin.findByIdAndUpdate(logged_admin, {
                $set: {
                    first_name: first_name,
                    last_name: last_name,
                    updated_at: updated_at
                }
            })
                .then((data) => {
                    res.status(201).json({
                        status: true,
                        message: 'Profile updated successfully.'
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: 'Profile was not updated. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Profile was not updated. Try again.'
            });
        }
    }
}

module.exports = AdminClass;