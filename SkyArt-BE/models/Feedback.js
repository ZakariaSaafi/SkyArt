import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const feedbackSchema = new Schema(
  {
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
    },
    postId : {
        type: Types.ObjectId,
        ref : 'Post',
        required : true
    },
    text: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Feedback', feedbackSchema);