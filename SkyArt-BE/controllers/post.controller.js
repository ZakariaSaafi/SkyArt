import Post from "../models/Post.js";
import Category from "../models/Category.js";
import Artist from "../models/Artist.js";
import User from "../models/User.js";

export const addPost = async (req, res) => {
  try {
    // Validate if the category exists
    const category = await Category.findById(req.body.category);
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }

    const post = await Post.create(req.body);
    res.status(201).json(post);
  } catch (error) {
    if (error.name === 'ValidationError') {
      res.status(400).json({ message: error.message });
    } else if (error.code === 11000) { // Duplicate key error
      res.status(409).json({ message: 'Duplicate key error' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

export const getPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }

export const getPostById = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await Post.findById(postId);
      if (!post) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(post);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const updatePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const { title, description, images, dateCreated, isAsset, assetPrice } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, description, images, dateCreated, isAsset, assetPrice },
        { new: true }
      );
      if (!updatedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export const deletePost = async (req, res) => {
    try {
      const postId = req.params.id;
      const deletedPost = await Post.findByIdAndDelete(postId);
      if (!deletedPost) {
        return res.status(404).json({ error: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };

export const getPostsByOwnerId = async (req, res) => {
  const ownerId = req.params.ownerId;

  try {
    const artist = await User.findById(ownerId);
    if (!artist) {
      return res.status(404).json({ message: 'Artist not found' });
    }
    const posts = await Post.find({ owner: ownerId }).populate('owner', 'name email'); // Optionally populate owner details
    if (!posts.length) {
      return res.status(404).json({ message: 'No posts found for this owner' });
    }
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};