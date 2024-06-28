import { Router } from 'express';
import { createResponse, getResponses, updateResponse, deleteResponse } from '../controllers/response.controller.js';
import { body } from 'express-validator';

const router = Router();

router.post(
  '/',
  [
    body('feedbackId').isMongoId(),
    body('userId').isMongoId(),
    body('text').isString()
  ],
  createResponse
);

router.get('/', getResponses);

router.put(
  '/:id',
  [body('text').isString()],
  updateResponse
);

router.delete('/:id', deleteResponse);

export default router;