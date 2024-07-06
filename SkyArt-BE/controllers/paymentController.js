/*import { client } from '../middlewares/paypalConfig.js';

export const createPayment = async (req, res) => {
  const { orderId } = req.body;
  const order = await Order.findById(orderId).populate('posts');

  if (!order) {
    return res.status(404).json({ message: 'Order not found' });
  }

  const paypalClient = await client();
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
    const paypalOrder = await paypalClient.execute(request);
    res.status(201).json(paypalOrder.result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};*/