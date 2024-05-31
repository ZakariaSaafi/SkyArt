import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    resultCount: {
        type: Number,
        required: true,
        default: 0
    },
    posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
    }]
}, {timestamps: true});

export default mongoose.model('Category', categorySchema);

