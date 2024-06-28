import Notification from '../models/Notification.js';

export const getNotifications = async (req, res) => {
  const { userId } = req.params;

  try {
    const notifications = await Notification.find({ userId }).sort({ date: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).send('Server Error');
  }
};