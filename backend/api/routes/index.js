import 'regenerator-runtime/runtime';

import {
    isAdminLoggedIn,
    isUserLoggedIn
} from './../utils/auth';
import Admin from './../controllers/admin';
import User from './../controllers/user';
import Article from './../controllers/article';
import Supplier from "./../controllers/supplier";

import dotenv from 'dotenv';
dotenv.config();

const adminCtrl = new Admin();
const userCtrl = new User();
const articleCtrl = new Article()
const supplierCtrl = new Supplier()

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

    //users
    app.post(endpoint + 'login', userCtrl.login);
    app.post(endpoint + 'register', userCtrl.register);
    app.put(endpoint + 'user/update/profile', isUserLoggedIn, userCtrl.updateUserProfile);
    app.delete(endpoint + 'user/delete/:user_id', isAdminLoggedIn, userCtrl.deleteUser);
    app.get(endpoint + 'users', isAdminLoggedIn, userCtrl.allUsers);
    app.get(endpoint + 'user/:user_id', userCtrl.userDetailsById);

    //articles
    app.post(endpoint + 'article/add', isAdminLoggedIn, articleCtrl.add);
    app.get(endpoint + 'articles', articleCtrl.allArticles)
    app.put(endpoint + 'article/update/:article_id', isAdminLoggedIn, articleCtrl.update);
    app.delete(endpoint + 'article/delete/:article_id', isAdminLoggedIn, articleCtrl.delete);
    app.get(endpoint + 'article/:article_id', articleCtrl.articleDetailsById);

    //supplier
    app.post(endpoint + 'supplier/apply', isUserLoggedIn, supplierCtrl.apply);
    app.get(endpoint + 'supplier/approve/:supplier_id', isAdminLoggedIn, supplierCtrl.approve);
    app.get(endpoint + 'suppliers', isAdminLoggedIn, supplierCtrl.allSuppliers);
    app.delete(endpoint + 'supplier/delete/:supplier_id', isAdminLoggedIn, supplierCtrl.deleteSupplier);
    app.get(endpoint + 'supplier/:supplier_id', supplierCtrl.supplierDetailsById);
};