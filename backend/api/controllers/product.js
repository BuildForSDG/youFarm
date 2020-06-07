import { isEmpty, currentTimestamp, decodeJWToken } from '../utils/helper';
import Product from '../models/product';
import User from '../models/user';

class ProductClass {
    async add(req, res) {
        try {
            const token = req.body.token || req.params.token || req.headers['x-access-token'];
            const logged_user = decodeJWToken(token, 'user');
            const publisher = await User.findOne({
                _id: logged_user
            });
            let { name, description, category, price, status, image_url } = req.body;
            const created_at = currentTimestamp();

            const requiredValues = [name, description, category, price, status];
            const isValueEmpty = isEmpty(requiredValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields.'
                });

            const data = {
                name,
                description,
                price,
                status,
                category,
                image_url,
                publisher: {
                    _id: publisher._id,
                    name: publisher.first_name + ' ' + publisher.last_name,
                    email: publisher.email,
                    phone: publisher.phone,
                    gender: publisher.gender,
                    state: publisher.state,
                    city: publisher.city,
                    address: publisher.address
                },
                created_at,
                updated_at: created_at
            };

            const newProduct = new Product(data);
            newProduct
                .save()
                .then(async (data) => {
                    const details = await Product.findOne({
                        _id: data._id
                    });
                    res.status(201).json({
                        status: true,
                        message: 'Product created successfully',
                        data: details
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occur, failed to create product. Try again' + err
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occur, failed to create product. Try again' + error
            });
        }
    }

    async update(req, res) {
        try {
            let { name, description, category, price, status, image_url } = req.body;
            const updated_at = currentTimestamp();

            const requiredValues = [name, description, category, price, status];
            const isValueEmpty = isEmpty(requiredValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields.'
                });

            const { product_id } = req.params;
            let { product_exists } = false;

            if (!product_id)
                return res.status(404).json({
                    status: false,
                    message: 'Product does not exists.'
                });

            const product = await Product.findOne({
                _id: product_id
            });
            product_exists = product ? true : false;

            if (!product_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Product does not exists.'
                });

            const data = {
                name,
                description,
                price,
                status,
                category,
                image_url,
                updated_at: updated_at
            };

            Product.findByIdAndUpdate(product_id, {
                $set: data
            })
                .then(async (data) => {
                    const details = await Product.findOne({
                        _id: product_id
                    });
                    res.status(201).json({
                        status: true,
                        message: 'Product updated successfully',
                        data: details
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occur, failed to update product. Try again'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occur, failed to create product. Try again'
            });
        }
    }

    async allProducts(req, res) {
        try {
            let all_products = [];
            const products = await Product.find({}).sort({
                _id: -1
            });

            if (products.length > 0) {
                for (let x in products) {
                    all_products.push({
                        _id: products[x]._id,
                        name: products[x].name,
                        description: products[x].description,
                        price: products[x].price,
                        image_url: products[x].image_url,
                        category: products[x].category,
                        status: products[x].status,
                        publisher: products[x].publisher,
                        created_at: products[x].created_at,
                        updated_at: products[x].updated_at
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: all_products
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: 'No product added yet.'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Unable to retrieve all products.' + error
            });
        }
    }

    async myProducts(req, res) {
        try {
            const token = req.body.token || req.params.token || req.headers['x-access-token'];
            const logged_user = decodeJWToken(token, 'user');

            const ObjectId = require('mongoose').Types.ObjectId;

            let all_products = [];
            const products = await Product.find({ 'publisher._id': new ObjectId(logged_user) }).sort({
                _id: -1
            });

            if (products.length > 0) {
                for (let x in products) {
                    all_products.push({
                        _id: products[x]._id,
                        name: products[x].name,
                        description: products[x].description,
                        price: products[x].price,
                        image_url: products[x].image_url,
                        category: products[x].category,
                        status: products[x].status,
                        publisher: products[x].publisher,
                        created_at: products[x].created_at,
                        updated_at: products[x].updated_at
                    });
                }
                return res.status(200).json({
                    status: true,
                    data: all_products
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: 'No product added yet.'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Unable to retrieve all products.' + error
            });
        }
    }

    async productDetailsById(req, res) {
        try {
            const { product_id } = req.params;
            let { product_exists } = false;

            if (!product_id)
                return res.status(404).json({
                    status: false,
                    message: 'Product does not exists.'
                });

            const product = await Product.findOne({
                _id: product_id
            });
            product_exists = product ? true : false;

            if (!product_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Product does not exists.'
                });

            let details = {
                _id: product._id,
                name: product.name,
                description: product.description,
                price: product.price,
                image_url: product.image_url,
                category: product.category,
                status: product.status,
                publisher: product.publisher,
                created_at: product.created_at,
                updated_at: product.updated_at
            };

            return res.status(200).json({
                status: true,
                data: details
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Product details was not retrieved. Try again.'
            });
        }
    }

    async delete(req, res) {
        try {
            const { product_id } = req.params;
            let { product_exists } = false;

            if (!product_id)
                return res.status(404).json({
                    status: false,
                    message: 'Product does not exists.'
                });

            const product = await Product.findOne({
                _id: product_id
            });
            product_exists = product ? true : false;

            if (!product_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Product does not exists.'
                });

            Product.findByIdAndDelete(product_id)
                .then((data) => {
                    res.status(201).json({
                        status: true,
                        message: 'Product successfully deleted.'
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occured. Unable to delete product. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to delete product. Try again.' + error
            });
        }
    }
}
module.exports = ProductClass;