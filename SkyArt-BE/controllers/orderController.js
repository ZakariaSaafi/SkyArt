// controllers/orderController.js
import Order from '../models/Order.js';
import Post from '../models/Post.js';
import archiver from 'archiver';
import path from 'path';
import fs from 'fs';
import { getPostById } from './post.controller.js'; // Import getPostById method from postController


export const createOrder = async (req, res) => {
    const { userId, posts, totalAmount } = req.body;

    try {
        // Validate posts
        for (let i = 0; i < posts.length; i++) {
            const post = await Post.findById(posts[i].postId);
            if (!post) {
                return res.status(400).json({ message: `Post with ID ${posts[i].postId} not found` });
            }
        }

        const newOrder = new Order({
            userId,
            posts,
            totalAmount,
        });

        const savedOrder = await newOrder.save();
        res.status(201).json(savedOrder);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Method to add a post to an order
export const addPostToOrder = async (req, res) => {
    const { userId, postId, totalAmount } = req.body;
  
    try {
      // Validate the post
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(400).json({ message: `Post with ID ${postId} not found` });
      }
  
      // Check if there's an existing pending order for the user
      let order = await Order.findOne({ userId, status: 'pending' });
  
      if (order) {
        // Add the post to the existing order
        order.posts.push({ postId });
        order.totalAmount += totalAmount;
      } else {
        // Create a new order including the post
        order = new Order({
          userId,
          posts: [{ postId }],
          totalAmount,
        });
      }
  
      // Save the order
      const savedOrder = await order.save();
      res.status(200).json(savedOrder);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  // Controller method to get all posts for an order by order ID
export const getOrderPosts = async (req, res) => {
  
    try {
        const order = await Order.findOne({ status: 'pending' }).sort({ date: -1 }).populate({
            path: 'posts.postId',
            model: 'Post'
          });


      if (!order) {
        return res.status(400).json({ message: 'Order not found' });
      }

      res.status(200).json(order.posts);
    } catch (error) {
      console.error('Error fetching order posts:', error);
      res.status(500).json({ message: 'Error fetching order posts', error });
    }
  };

// Get all orders
export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('posts');
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Get order by ID
export const getOrderById = async (req, res) => {
    const { id } = req.params;

    try {
        const order = await Order.findById(id).populate('posts');
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json(order);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getAllPendingOrders = async (req, res) => {
    try {
      const pendingOrders = await Order.find({ status: 'pending' });
      res.status(200).json(pendingOrders);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving pending orders', error });
    }
  };
  
// Function to download order posts
export const downloadOrderPosts = async (orderId, res) => {
    const order = await Order.findById(orderId).populate('posts');

    if (!order) {
        return res.status(404).json({ message: 'Order not found' });
    }

    const zipFileName = `order_${orderId}.zip`;
    const zipFilePath = path.join(__dirname, '..', 'public', 'downloads', zipFileName);

    const output = fs.createWriteStream(zipFilePath);
    const archive = archiver('zip', { zlib: { level: 9 } });

    output.on('close', () => {
        res.download(zipFilePath, zipFileName, (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Could not download the file.');
            } else {
                fs.unlinkSync(zipFilePath); // Clean up the file after download
            }
        });
    });

    archive.on('error', (err) => {
        throw err;
    });

    archive.pipe(output);

    for (const post of order.posts) {
        const postFilePath = path.join(__dirname, '..', 'public', 'uploads', post.postId.files[0]); // Adjust based on where your files are stored
        archive.file(postFilePath, { name: path.basename(postFilePath) });
    }

    await archive.finalize();
};

// Controller method to handle download request
export const handleDownloadOrderPosts = async (req, res) => {
    const { orderId } = req.params;
    try {
        await downloadOrderPosts(orderId, res);
    } catch (error) {
        console.error('Error downloading order posts:', error);
        res.status(500).json({ message: 'Error downloading order posts', error });
    }
};

export const getOrderHistoryByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).populate('posts');
        if (!orders) {
            return res.status(404).json({ message: 'No orders found for this user' });
        }
        res.status(200).json(orders);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
export const cancelPendingOrder = async (req, res) => {
    try {
      const order = await Order.findOneAndUpdate(
        { status: 'pending' },
        { status: 'canceled' },
        { new: true }
      );
  
      if (!order) {
        return res.status(400).json({ message: 'No pending order found' });
      }
  
      // Create a new empty order
      const newOrder = new Order({
        userId: order.userId,
        posts: [],
        totalAmount: 0,
        status: 'pending',
      });
  
      const savedNewOrder = await newOrder.save();
  
      res.status(200).json({
        message: 'Order canceled successfully. A new empty order has been created.',
        canceledOrder: order,
        newOrder: savedNewOrder
      });
    } catch (error) {
      console.error('Error canceling order:', error);
      res.status(500).json({ message: 'Error canceling order', error });
    }
  };
export const confirmPendingOrderAndCreatePayment = async (req, res) => {
    try {
      const order = await Order.findOneAndUpdate(
        { status: 'pending' },
        { status: 'confirmed' },
        { new: true }
      );
  
      if (!order) {
        return res.status(400).json({ message: 'No pending order found' });
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
    } catch (error) {
      console.error('Error confirming order:', error);
      res.status(500).json({ message: 'Error confirming order', error });
    }
    };


export const getConfirmedOrdersByUserId = async (req, res) => {
    const userId = req.params.userId;
  
    try {
      const confirmedOrders = await Order.find({ userId: userId, status: 'completed' }).populate('posts.postId');
  
      if (!confirmedOrders.length) {
        return res.status(404).json({ message: 'No confirmed orders found for this user',userId });
      }
  
      res.status(200).json(confirmedOrders);
    } catch (error) {
      console.error('Error fetching confirmed orders:', error);
      res.status(500).json({ message: 'Error fetching confirmed orders', error });
    }
};

export const getPendingOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const pendingOrders = await Order.find({ userId, status: 'pending' });

        if (!pendingOrders.length) {
            return res.status(404).json({ message: 'No pending orders found for this user.' });
        }

        res.status(200).json(pendingOrders);
    } catch (error) {
        console.error('Error fetching pending orders:', error);
        res.status(500).json({ message: 'Error fetching pending orders', error });
    }
};

export const deletePostFromPendingOrder = async (req, res) => {
    const { userId, postId } = req.params;

    try {
        // Get the pending orders for the user
        const pendingOrders = await Order.find({ userId, status: 'pending' });

        if (!pendingOrders.length) {
            return res.status(404).json({ message: 'No pending orders found for this user.' });
        }

        // Get the first pending order
        const order = pendingOrders[0];

        // Find the index of the post to be removed
        const postIndex = order.posts.findIndex(post => post.postId.toString() === postId);

        if (postIndex === -1) {
            return res.status(404).json({ message: 'Post not found in the order.' });
        }

        // Remove the post from the order
        order.posts.splice(postIndex, 1);

        // Save the updated order
        await order.save();

        res.status(200).json({ message: 'Post removed from order successfully', order });
    } catch (error) {
        console.error('Error removing post from order:', error);
        res.status(500).json({ message: 'Error removing post from order', error });
    }
};