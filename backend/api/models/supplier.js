import mongoose from 'mongoose';

const supplierSchema = mongoose.Schema({
    business_name: {
        type: String,
        required: true
    },
    business_category: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
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
    approved: {
        type: Boolean,
        required: true
    },
    created_at: {
        type: String,
        required: true
    },
    updated_at: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('suppliers', supplierSchema);