import { Router } from 'express';
import { getNotifications } from '../controllers/notification.controller.js';

const router = Router();

router.get('/:userId', getNotifications);

export default router;