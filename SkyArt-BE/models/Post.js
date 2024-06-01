import mongoose from "mongoose";
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true , 'Please provide title']
    },
    description: {
        type: String,
        required: [true , 'Please provide description']
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
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }
}, {timestamps: true});

export default mongoose.model('Post', postSchema);
