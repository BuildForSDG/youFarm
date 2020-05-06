import mongoose from 'mongoose';

const adminSchema = mongoose.Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, lowercase: true },
    password: { type: String, required: true },
    created_at: { type: String, required: true },
    updated_at: { type: String, required: true }
});

module.exports = mongoose.model('admins', adminSchema);