import 'regenerator-runtime/runtime';

import { isAdminLoggedIn, isUserLoggedIn } from './../utils/auth';
import Admin from './../controllers/admin';
import User from './../controllers/user';

import dotenv from 'dotenv';
dotenv.config();

const adminCtrl = new Admin();
const userCtrl = new User();

const endpoint = process.env.ENDPOINT;

module.exports = (app) => {
    app.get(endpoint, (req, res) => {
        res.status(200).send('Welcome to youFarm api');
    });

    //admins
    app.post(endpoint + 'admin/login', adminCtrl.login);
    app.get(endpoint + 'admins', isAdminLoggedIn, adminCtrl.allAdmins);
    app.post(endpoint + 'admin/add', isAdminLoggedIn, adminCtrl.add);
    app.delete(endpoint + 'admin/delete/:admin_id', isAdminLoggedIn, adminCtrl.delete);
    app.put(endpoint + 'admin/update/profile', isAdminLoggedIn, adminCtrl.updateAdminProfile);
    app.delete(endpoint + 'user/delete/:user_id', isAdminLoggedIn, adminCtrl.deleteUser);
    app.get(endpoint + 'users', isAdminLoggedIn, adminCtrl.allUsers);
    app.get(endpoint + 'user/:user_id', isAdminLoggedIn, adminCtrl.userDetailsById);

    //users
    app.post(endpoint + 'login', userCtrl.login);
    app.post(endpoint + 'register', userCtrl.register);
    app.put(endpoint + 'user/update/profile', isUserLoggedIn, userCtrl.updateUserProfile);
};