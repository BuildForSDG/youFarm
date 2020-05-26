import 'regenerator-runtime/runtime';

import { isAdminLoggedIn, isUserLoggedIn, isLoggedIn, isSupplier } from './../utils/auth';
import Admin from './../controllers/admin';
import User from './../controllers/user';
import Article from './../controllers/article';
import Supplier from './../controllers/supplier';
import Product from './../controllers/product';

import dotenv from 'dotenv';
dotenv.config();

const adminCtrl = new Admin();
const userCtrl = new User();
const articleCtrl = new Article();
const supplierCtrl = new Supplier();
const productCtrl = new Product();

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
    app.get(endpoint + 'user/:user_id', isLoggedIn, userCtrl.userDetailsById);

    //articles
    app.post(endpoint + 'article/add', isAdminLoggedIn, articleCtrl.add);
    app.get(endpoint + 'articles', isLoggedIn, articleCtrl.allArticles);
    app.put(endpoint + 'article/update/:article_id', isAdminLoggedIn, articleCtrl.update);
    app.delete(endpoint + 'article/delete/:article_id', isAdminLoggedIn, articleCtrl.delete);
    app.get(endpoint + 'article/:article_id', isLoggedIn, articleCtrl.articleDetailsById);

    //supplier
    app.post(endpoint + 'supplier/apply', isUserLoggedIn, supplierCtrl.apply);
    app.get(endpoint + 'suppliers', isAdminLoggedIn, supplierCtrl.allSuppliers);
    app.delete(endpoint + 'supplier/delete/:supplier_id', isAdminLoggedIn, supplierCtrl.deleteSupplier);
    app.get(endpoint + 'supplier/:supplier_id', isLoggedIn, supplierCtrl.supplierDetailsById);
    app.get(endpoint + 'supplier/approve/:supplier_id', isAdminLoggedIn, supplierCtrl.approve);
    app.get(endpoint + 'supplier/reject/:supplier_id', isAdminLoggedIn, supplierCtrl.reject);
    app.get(endpoint + 'supplier/disable/:supplier_id', isAdminLoggedIn, supplierCtrl.disable);

    //products
    app.post(endpoint + 'product/add', isSupplier, productCtrl.add);
    app.get(endpoint + 'products', isLoggedIn, productCtrl.allProducts);
    app.get(endpoint + 'products/supplier', isLoggedIn, productCtrl.myProducts);
    app.put(endpoint + 'product/update/:product_id', isLoggedIn, productCtrl.update);
    app.delete(endpoint + 'product/delete/:product_id', isLoggedIn, productCtrl.delete);
    app.get(endpoint + 'product/:product_id', productCtrl.productDetailsById);
};