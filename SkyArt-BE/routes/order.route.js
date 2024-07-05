import express from 'express';
import { getOrderPosts, addPostToOrder, createOrder, getOrders, getOrderById, downloadOrderPosts, getOrderHistoryByUserId, getAllPendingOrders, cancelPendingOrder, confirmPendingOrderAndCreatePayment, getConfirmedOrdersByUserId, getPendingOrdersByUserId, deletePostFromPendingOrder  } from '../controllers/orderController.js';

const router = express.Router();

router.post('/', createOrder);
router.post('/addPost', addPostToOrder);

router.get('/', getOrders);
router.get('/order/:id', getOrderById);
router.get('/pending', getAllPendingOrders);
router.get('/getOrderPosts', getOrderPosts);
router.get('/download/:orderId', downloadOrderPosts);
router.get('/history/:userId', getOrderHistoryByUserId);
router.put('/cancelOrder', cancelPendingOrder);
router.put('/confirmPendingOrderAndCreatePayment', confirmPendingOrderAndCreatePayment);
router.get('/confirmed-orders/:userId', getConfirmedOrdersByUserId);
router.get('/pending/:userId', getPendingOrdersByUserId);
router.delete('/pending/:userId/posts/:postId', deletePostFromPendingOrder);

export default router;