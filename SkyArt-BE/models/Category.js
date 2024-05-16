const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    resultCount: {
        type: Number,
        required: true,
        default: 0
    }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
