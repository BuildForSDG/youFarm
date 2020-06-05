import Supplier from '../models/supplier';
import User from "../models/user";
import {
    trimString,
    isEmpty,
    currentTimestamp,
    decodeJWToken
} from '../utils/helper';
import dotenv from 'dotenv';
dotenv.config();

class SupplierClass {

    async apply(req, res) {
        try {
            const token = req.body.token || req.params.token || req.headers['x-access-token'];
            const logged_user = decodeJWToken(token, 'user');

            const user = await User.findOne({
                _id: logged_user
            })

            let {
                business_name,
                business_category
            } = req.body;
            const created_at = currentTimestamp();
            let {
                email_exists,
                phone_exists,
                business_name_exist
            } = false;

            const requiredValues = [business_name, business_category];
            const isValueEmpty = isEmpty(requiredValues);

            if (isValueEmpty)
                return res.status(200).json({
                    status: false,
                    message: 'Please fill all fields.'
                });

            const check_email = await Supplier.findOne({
                email: trimString(user.email.toLowerCase())
            }, {
                email: 1
            });
            const check_phone = await Supplier.findOne({
                phone: user.phone
            }, {
                phone: 1
            });

            const check_business_name = await Supplier.findOne({
                business_name: business_name
            }, {
                business_name: 1
            });

            email_exists = check_email ? true : false;
            phone_exists = check_phone ? true : false;
            business_name_exist = check_business_name ? true : false;

            if (email_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Email already in use by another supplier.'
                });

            if (phone_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Phone number already in use by another supplier.'
                });

            if (business_name_exist)
                return res.status(200).json({
                    status: false,
                    message: 'Business name already in use by another supplier.'
                });

            const data = {
                business_name: business_name,
                business_category: business_category,
                user_id: user._id,
                first_name: user.first_name,
                last_name: user.last_name,
                email: trimString(user.email.toLowerCase()),
                phone: user.phone,
                gender: user.gender,
                state: user.state,
                city: user.city,
                address: user.address,
                status: "pending",
                created_at,
                updated_at: created_at
            };

            const newSupplier = new Supplier(data);

            newSupplier
                .save()
                .then(async (data) => {
                    const details = await Supplier.findOne({
                        _id: data._id
                    });
                    res.status(201).json({
                        status: true,
                        message: 'Application successful. Please wait for admin approval',
                        data: details
                    });
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occured. Unable to apply as supplier. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to apply as supplier. Try again.' + error
            });
        }
    }

    async approve(req, res) {
        try {
            const approved_at = currentTimestamp();

            const {
                supplier_id
            } = req.params;

            const supplier = await Supplier.findOne({
                _id: supplier_id
            });

            const user_id = supplier.user_id;

            const supplier_exists = supplier ? true : false;

            if (!supplier_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Supplier does not exists.'
                });

            Supplier.findByIdAndUpdate(supplier_id, {
                $set: {
                    status: "approved",
                    approved_at: approved_at
                }
            }, {
                returnNewDocument: true,
                new: true,
                strict: false
            })
                .then(async () => {
                    res.status(201).json({
                        status: true,
                        message: "Supplier approved successfully"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "An error occur, can't approve supplier. Try again"
                    })
                })

            User.findByIdAndUpdate(user_id, {
                $set: {
                    is_supplier: true,
                    supplier_status: "approved"
                }
            }, {
                returnNewDocument: true,
                new: true,
                strict: false
            })
                .then(async () => {
                    res.status(201).json({
                        status: true,
                        message: "Supplier approved successfully"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "An error occur, can't approve supplier. Try again"
                    })
                })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occur, can't approve supplier. Try again" + error
            })
        }
    }

    async reject(req, res) {
        try {
            const rejected_at = currentTimestamp();

            const {
                supplier_id
            } = req.params;

            const supplier = await Supplier.findOne({
                _id: supplier_id
            });

            const user_id = supplier.user_id;

            const supplier_exists = supplier ? true : false;

            if (!supplier_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Supplier does not exists.'
                });

            Supplier.findByIdAndUpdate(supplier_id, {
                $set: {
                    status: "rejected",
                    rejected_at: rejected_at
                }
            }, {
                returnNewDocument: true,
                new: true,
                strict: false
            })
                .then(async () => {
                    res.status(201).json({
                        status: true,
                        message: "Supplier rejected successfully"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "An error occur, can't reject supplier. Try again"
                    })
                })

            User.findByIdAndUpdate(user_id, {
                $set: {
                    is_supplier: false,
                    supplier_status: "rejected"
                }
            }, {
                returnNewDocument: true,
                new: true,
                strict: false
            })
                .then(async () => {
                    res.status(201).json({
                        status: true,
                        message: "Supplier rejected successfully"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "An error occur, can't reject supplier. Try again"
                    })
                })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occur, can't reject supplier. Try again" + error
            })
        }
    }

    async disable(req, res) {
        try {
            const disabled_at = currentTimestamp();

            const {
                supplier_id
            } = req.params;

            const supplier = await Supplier.findOne({
                _id: supplier_id
            });

            const user_id = supplier.user_id;

            const supplier_exists = supplier ? true : false;

            if (!supplier_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Supplier does not exists.'
                });

            Supplier.findByIdAndUpdate(supplier_id, {
                $set: {
                    status: "disabled",
                    disabled_at: disabled_at
                }
            }, {
                returnNewDocument: true,
                new: true,
                strict: false
            })
                .then(async () => {
                    res.status(201).json({
                        status: true,
                        message: "Supplier disabled successfully"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "An error occur, can't disable supplier. Try again"
                    })
                })

            User.findByIdAndUpdate(user_id, {
                $set: {
                    is_supplier: false,
                    supplier_status: "disabled"
                }
            }, {
                returnNewDocument: true,
                new: true,
                strict: false
            })
                .then(async () => {
                    res.status(201).json({
                        status: true,
                        message: "Supplier disabled successfully"
                    })
                })
                .catch((err) => {
                    res.status(500).json({
                        status: false,
                        message: "An error occur, can't disable supplier. Try again"
                    })
                })

        } catch (error) {
            res.status(500).json({
                status: false,
                message: "An error occur, can't disable supplier. Try again" + error
            })
        }
    }

    async allSuppliers(req, res) {
        try {
            const suppliers = await Supplier.find({}).sort({
                _id: -1
            });

            if (suppliers.length > 0) {
                return res.status(200).json({
                    status: true,
                    data: suppliers
                });
            } else {
                return res.status(200).json({
                    status: false,
                    message: 'No supplier yet.'
                });
            }
        } catch (error) {
            return res.status(500).json({
                status: false,
                message: 'Unable to retrieve all suppliers.'
            });
        }
    }

    async supplierDetailsById(req, res) {
        try {
            const {
                supplier_id
            } = req.params;
            let {
                supplier_exists
            } = false;

            if (!supplier_id)
                return res.status(404).json({
                    status: false,
                    message: 'Supplier details does not exists.'
                });

            const supplier = await Supplier.findOne({
                _id: supplier_id
            });
            supplier_exists = supplier ? true : false;

            if (!supplier_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Supplier details does not exists.'
                });

            let details = {
                id: supplier._id,
                business_name: supplier.business_name,
                business_category: supplier.business_category,
                first_name: supplier.first_name,
                last_name: supplier.last_name,
                email: supplier.email,
                phone: supplier.phone,
                gender: supplier.gender,
                state: supplier.state,
                city: supplier.city,
                address: supplier.address,
                status: supplier.status,
                created_at: supplier.created_at,
                updated_at: supplier.updated_at,
                approved_at: supplier.approved_at
            };

            return res.status(200).json({
                status: true,
                data: details
            });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'Supplier details was not retrieved. Try again.'
            });
        }
    }

    async deleteSupplier(req, res) {
        try {
            const {
                supplier_id
            } = req.params;
            let {
                supplier_exists
            } = false;

            if (!supplier_id)
                return res.status(404).json({
                    status: false,
                    message: 'Supplier details does not exists.'
                });

            const check_supplier = await Supplier.findOne({
                _id: supplier_id
            });
            supplier_exists = check_supplier ? true : false;

            if (!supplier_exists)
                return res.status(200).json({
                    status: false,
                    message: 'Supplier details does not exists.'
                });

            Supplier.findByIdAndDelete(supplier_id)
                .then((data) => {
                    res.status(201).json({
                        status: true,
                        message: 'Supplier successfully deleted.'
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        status: false,
                        message: 'An error occured. Unable to delete supplier. Try again.'
                    });
                });
        } catch (error) {
            res.status(500).json({
                status: false,
                message: 'An error occured. Unable to delete supplier. Try again.'
            });
        }
    }
}
module.exports = SupplierClass;