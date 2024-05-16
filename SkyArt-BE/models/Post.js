const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    files: {
        type: [String],
        default: []
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    isAsset: {
        type: Boolean,
        default: false
    },
    assetPrice: {
        type: Number,
        required: function() {
            return this.isAsset === true;
        }
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
