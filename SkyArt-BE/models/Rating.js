import mongoose from "mongoose";

const ratingSchema = new mongoose.Schema({
    level: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Rating', ratingSchema);

