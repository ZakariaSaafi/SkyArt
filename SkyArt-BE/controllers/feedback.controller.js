import Feedback from '../models/Feedback.js';
import { validationResult } from 'express-validator';
import sendEmail from '../config/emailConfig.js';
import User from '../models/User.js';
import Notification from '../models/Notification.js';

export const createFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId, targetId, onModel, text } = req.body;

  try {
    const feedback = new Feedback({ userId, targetId, onModel, text });
    await feedback.save();

    // Retrieve admin ID and email (assuming a single admin user for simplicity)
    const admin = await User.findOne({ role: 'admin' }); // Adjust the query as needed

    if (admin) {
      // Send email to the admin
      sendEmail(admin.email, 'New Feedback Received', `You have received new feedback from user ${userId}.`);
    
    // Create a notification for the admin
    const notification = new Notification({
        userId: admin._id,
        message: `You have received new feedback from user ${userId}.`
      });
      await notification.save();
    }

    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const getFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('userId').populate('targetId');
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const updateFeedback = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;
  const { text } = req.body;

  try {
    const feedback = await Feedback.findByIdAndUpdate(id, { text }, { new: true });
    if (!feedback) {
      return res.status(404).send('Feedback not found');
    }
    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};

export const deleteFeedback = async (req, res) => {
  const { id } = req.params;

  try {
    const feedback = await Feedback.findByIdAndDelete(id);
    if (!feedback) {
      return res.status(404).send('Feedback not found');
    }
    res.status(200).send('Feedback deleted');
  } catch (error) {
    res.status(500).send('Server Error');
  }
};