import { Router } from 'express';
import { createFeedback, getFeedback, updateFeedback, deleteFeedback } from '../controllers/feedback.controller.js';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/',
  [
    body('userId').isMongoId(),
    body('targetId').isMongoId(),
    body('onModel').isIn(['Post', 'Event', 'User']),
    body('text').isString()
  ],
  createFeedback
);

router.get('/', getFeedback);

router.put(
  '/:id',
  [body('text').isString()],
  updateFeedback
);

router.delete('/:id', deleteFeedback);

export default router;