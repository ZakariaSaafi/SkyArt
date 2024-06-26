import mongoose from "mongoose";

const FeedbackSchema = new mongoose.Schema({
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: [true, 'Please provide a message']
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, {timestamps: true});

export default mongoose.model('Feedback', FeedbackSchema);
