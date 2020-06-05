import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    first_name: {
        type: String,
        required: true
    },
    last_name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    state: {
        type: String
    },
    city: {
        type: String
    },
    address: {
        type: String
    },
    is_supplier: {
        type: Boolean,
        required: true
    },
    supplier_status: {
        type: String
    },
    password: {
        type: String,
        required: true
    },
    deleted: {
        type: Boolean
    },
    created_at: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        required: true
    },
    deleted_at: {
        type: String
    }
});

module.exports = mongoose.model('users', userSchema);