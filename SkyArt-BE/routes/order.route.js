import express from 'express';
import { createOrder, getOrders, getOrderById, downloadOrderPosts, getOrderHistoryByUserId  } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', getOrders);
router.get('/:id', getOrderById);
router.get('/:orderId/download', downloadOrderPosts);
router.get('/history/:userId', getOrderHistoryByUserId);

export default router;