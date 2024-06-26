import express from 'express';
import { sendMessage, getMessages, getUsersWithMessages, getUserMessages, updateFeedback } from '../controllers/feedback.controller.js';
import { protect, authMiddleware } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.route('/')
    .post(authMiddleware, sendMessage)
    .get(authMiddleware, getMessages);

router.route('/users')
    .get(authMiddleware, getUsersWithMessages);

router.route('/user/:userId')
    .get(authMiddleware, getUserMessages);

router.route('/:id')
    .patch(authMiddleware, updateFeedback);

export default router;
