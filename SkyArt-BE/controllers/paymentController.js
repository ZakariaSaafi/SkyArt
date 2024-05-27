import checkoutNodeJssdk from '@paypal/checkout-server-sdk';
import { client } from '../middlewares/paypalConfig.js';
import Order from '../models/Order.js';

export const createPayment = async (req, res) => {
    const { orderId } = req.body;
    const order = await Order.findById(orderId).populate('posts.postId');

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    let request = new checkoutNodeJssdk.orders.OrdersCreateRequest();
    request.prefer("return=representation");
    request.requestBody({
        intent: 'CAPTURE',
        purchase_units: [{
            amount: {
                currency_code: 'USD',
                value: order.totalAmount.toString(),
            }
        }]
    });

    try {
        const paypalOrder = await client.execute(request);
        res.status(201).json(paypalOrder.result);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const capturePayment = async (req, res) => {
    const { orderId } = req.body;

    const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
    request.requestBody({});

    try {
        const capture = await client.execute(request);
        const order = await Order.findByIdAndUpdate(orderId, { status: 'completed' }, { new: true });

        res.status(200).json({ capture: capture.result, order });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};