import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
    date: {
        type: Date,
        default: Date.now
    },
    text: {
        type: String,
        required: true
    },
    postId: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Comment', commentSchema);
