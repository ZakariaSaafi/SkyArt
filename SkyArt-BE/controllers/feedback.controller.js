import asyncHandler from 'express-async-handler';
import Feedback from "../models/Feedback.js";
import User from "../models/User.js";
import sendEmail from "../config/emailConfig.js";



const getEmailContent = (isAdmin, senderUsername) => {
  const appUrl = 'http://localhost:4200/feedback'; // Replace with your actual app URL
  const appUrlAdmin = 'http://localhost:4200/feedback/admin'; // Replace with your actual app URL

  if (isAdmin) {
    return {
      subject: 'You received a feedback',
      text: `You received a feedback from ${senderUsername}.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #007bff; border-radius: 10px; background-color: #f1f1f1;">
          <h2 style="color: #007bff; text-align: center;">You received a feedback</h2>
          <p style="color: #555; text-align: center;">You received a feedback from <strong>${senderUsername}</strong>.</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${appUrlAdmin}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">Go to Chat</a>
          </div>
        </div>
      `
    };
  } else {
    return {
      subject: 'You received a message from support',
      text: `You received a message from the support team.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #007bff; border-radius: 10px; background-color: #f1f1f1;">
          <h2 style="color: #007bff; text-align: center;">You received a message from support</h2>
          <p style="color: #555; text-align: center;">You received a message from the support team.</p>
          <div style="text-align: center; margin-top: 20px;">
            <a href="${appUrl}" style="display: inline-block; padding: 10px 20px; background-color: #28a745; color: #fff; text-decoration: none; border-radius: 5px;">Go to Chat</a>
          </div>
        </div>
      `
    };
  }
};

// @desc    Send a message
// @route   POST /api/feedback
// @access  Private
const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.userData.userId;

  const feedback = new Feedback({
    sender: senderId,
    receiver: receiverId,
    message,
  });

  const createdFeedback = await feedback.save();

  // Fetch sender and receiver information
  const sender = await User.findById(senderId);
  const receiver = await User.findById(receiverId);

  if (!sender || !receiver) {
    res.status(404).json({ message: 'User not found' });
    return;
  }

  // Determine the email content based on receiver's role
  const { subject, text, html } = getEmailContent(receiver.isAdmin, sender.name);

  // Send email
  sendEmail(receiver.email, subject, text, html);

  res.status(201).json(createdFeedback);
});

// @desc    Get messages for user
// @route   GET /api/feedback
// @access  Private
const getMessages = asyncHandler(async (req, res) => {
  const feedbacks = await Feedback.find({
    $or: [{ sender: req.userData.userId }, { receiver: req.userData.userId }]
  }).populate('sender', 'name email').populate('receiver', 'name email')

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
  }).populate('sender', 'name email').populate('receiver', 'name email')

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
