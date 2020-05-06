import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    gender: { type: String },
    state: { type: String },
    city: { type: String },
    address: { type: String },
    password: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

module.exports = mongoose.model('users', userSchema);