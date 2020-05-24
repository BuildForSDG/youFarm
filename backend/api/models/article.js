import mongoose from 'mongoose';

const articleSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    image_url: {
        type: String
    },
    category: {
        type: String,
        required: true
    },
    published: {
        type: Boolean
    },
    publisher: {
        type: Object
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

module.exports = mongoose.model('articles', articleSchema);