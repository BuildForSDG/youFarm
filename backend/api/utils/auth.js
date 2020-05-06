import Admin from '../models/admin';
import User from '../models/user';
import { verifyJWToken } from '../utils/helper';
import dotenv from 'dotenv';
dotenv.config();

export const isAdminLoggedIn = function(req, res, next) {
    const token = req.body.token || req.params.token || req.headers['x-access-token'];

    verifyJWToken(token)
        .then(async(decodedToken) => {
            let logged_admin = decodedToken.admin;
            let admin_exists = await Admin.findOne({ _id: logged_admin }, { _id: 0, password: 0, created_at: 0, updated_at: 0 });

            if (!admin_exists) return res.status(401).json({ status: false, message: 'unauthorized' });

            return next();
        })
        .catch((error) => {
            if (error.name == 'TokenExpiredError') {
                return res.status(401).json({ status: false, message: 'Token has expired' });
            } else {
                return res.status(401).json({ status: false, message: 'unauthorized' });
            }
        });
};

export const isUserLoggedIn = function(req, res, next) {
    const token = req.body.token || req.params.token || req.headers['x-access-token'];

    verifyJWToken(token)
        .then(async(decodedToken) => {
            let logged_user = decodedToken.user;
            let user_exists = await User.findOne({ _id: logged_user }, { _id: 0, password: 0, created_at: 0, updated_at: 0 });

            if (!user_exists)
                return res.status(401).json({
                    status: false,
                    message: 'Unauthorized'
                });

            return next();
        })
        .catch((error) => {
            if (error.name == 'TokenExpiredError') {
                return res.status(401).json({
                    status: false,
                    message: 'Token has expired'
                });
            } else {
                return res.status(401).json({
                    status: false,
                    message: 'Unauthorized User'
                });
            }
        });
};