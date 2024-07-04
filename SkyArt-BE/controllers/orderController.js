// controllers/orderController.js
import Order from '../models/Order.js';
import Post from '../models/Post.js';
import archiver from 'archiver';
import path from 'path';
import fs from 'fs';


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
  
export const downloadOrderPosts = async (req, res) => {
    const { orderId } = req.params;
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