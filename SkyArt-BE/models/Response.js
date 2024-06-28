import mongoose from 'mongoose';
const { Schema, model, Types } = mongoose;

const responseSchema = new Schema(
  {
    feedbackId: {
      type: Types.ObjectId,
      ref: 'Feedback',
      required: true
    },
    userId: {
      type: Types.ObjectId,
      ref: 'User',
      required: true
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

responseSchema.post('save', async function (doc) {
  try {
    const response = doc;
    const message = `You have received a new response from the admin on your feedback.`;

    const notification = new Notification({
      userId: response.userId,
      message,
      date: new Date()
    });

    await notification.save();
    console.log('Notification sent:', notification);
  } catch (error) {
    console.error('Error sending notification:', error);
  }
});

export default model('Response', responseSchema);