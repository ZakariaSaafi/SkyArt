const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    level: {
        type: String,
        required: true
    }
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
