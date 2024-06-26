import asyncHandler from 'express-async-handler';
import Feedback from "../models/Feedback.js";
import User from "../models/User.js";

// @desc    Send a message
// @route   POST /api/feedback
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, message, parentMessageId } = req.body;
  const senderId = req.userData.userId;

  const feedback = new Feedback({
    sender: senderId,
    receiver: receiverId,
    message,
    parentMessage: parentMessageId || null,
    isReply: !!parentMessageId
  });

  const createdFeedback = await feedback.save();

  res.status(201).json(createdFeedback);
});

// @desc    Get messages for user
// @route   GET /api/feedback
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({
    $or: [{ sender: req.userData.userId }, { receiver: req.userData.userId }]
  }).populate('sender', 'name email').populate('receiver', 'name email').populate('parentMessage');

  res.json(feedbacks);
});

// @desc    Get all users with messages for admin
// @route   GET /api/feedback/users
// @access  Private/Admin
const getUsersWithMessages = asyncHandler(async (req, res) => {
  const users = await Feedback.distinct("sender", { receiver: req.userData.userId });
  const userInfos = await User.find({ _id: { $in: users } }).select('name email');

  const userInfosWithFeedbacks = await Promise.all(userInfos.map(async user => {
    const feedbacks = await Feedback.find({ sender: user._id, receiver: req.userData.userId });
    return {
      ...user._doc,
      feedbacks
    };
  }));

  res.json(userInfosWithFeedbacks);
});

// @desc    Get messages from a specific user for admin
// @route   GET /api/feedback/user/:userId
// @access  Private/Admin
const getUserMessages = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const feedbacks = await Feedback.find({
    $or: [
      { sender: userId, receiver: req.userData.userId },
      { sender: req.userData.userId, receiver: userId }
    ]
  }).populate('sender', 'name email').populate('receiver', 'name email').populate('parentMessage');

  res.json(feedbacks);
});

// @desc    Update feedback
// @route   PATCH /api/feedback/:id
// @access  Private
const updateFeedback = asyncHandler(async (req, res) => {
  const feedbackId = req.params.id;
  const updates = req.body;

  const feedback = await Feedback.findById(feedbackId);

  if (!feedback) {
    res.status(404);
    throw new Error('Feedback not found');
  }

  if (feedback.receiver.toString() !== req.userData.userId && feedback.sender.toString() !== req.userData.userId) {
    res.status(401);
    throw new Error('Not authorized to update this feedback');
  }

  Object.keys(updates).forEach(key => {
    feedback[key] = updates[key];
  });

  const updatedFeedback = await feedback.save();

  res.json(updatedFeedback);
});

export { sendMessage, getMessages, getUsersWithMessages, getUserMessages, updateFeedback };
