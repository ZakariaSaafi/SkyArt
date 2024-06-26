import { Router } from 'express';
import { sendMessage, getMessages } from '../controllers/feedback.controller.js';
import {authMiddleware, protect} from '../middlewares/authMiddleware.js';

const router = Router();

router.route('/')
    .post(authMiddleware, sendMessage)  // Send a message
    .get(authMiddleware, getMessages);  // Get messages

export default router;
