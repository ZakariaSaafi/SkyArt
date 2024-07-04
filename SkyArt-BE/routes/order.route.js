import express from 'express';
import { addPostToOrder, createOrder, getOrders, getOrderById, downloadOrderPosts, getOrderHistoryByUserId, getAllPendingOrders  } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.post('/addPost', addPostToOrder);

router.get('/', getOrders);
router.get('/order/:id', getOrderById);
router.get('/pending', getAllPendingOrders);

router.get('/:orderId/download', downloadOrderPosts);
router.get('/history/:userId', getOrderHistoryByUserId);

export default router;