import asyncHandler from 'express-async-handler';
import Feedback from "../models/Feedback.js";


// @desc    Send a message
// @route   POST /api/feedback
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, message } = req.body;

  // Ensure req.user._id is set correctly from middleware
  const senderId = req.userData.userId;

  const feedback = new Feedback({
    sender: senderId,
    receiver: receiverId,
    message,
  });

  const createdFeedback = await feedback.save();

  res.status(201).json(createdFeedback);
});

// @desc    Get messages
// @route   GET /api/feedback
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({
    $or: [{ sender: req.userData.userId }, { receiver: req.userData.userId }]
  }).populate('sender', 'name email').populate('receiver', 'name email');

  res.json(feedbacks);
});

export { sendMessage, getMessages };
