import Comment from '../models/Comment.js';
import Post from '../models/Post.js';

// Create a new comment
export const addComment = async (req, res) => {
    try {
        const { text, postId } = req.body;

        // Validate if the post exists
        const existingPost = await Post.findById(postId);
        if (!existingPost) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const comment = new Comment({ text, postId });
        await comment.save();
        res.status(201).json(comment);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Get all comments
export const getComments = async (req, res) => {
    try {
        const comments = await Comment.find().populate('postId');
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get a single comment by ID
export const getCommentById = async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id).populate('post');
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a comment
export const updateComment = async (req, res) => {
    try {
        const { text, post } = req.body;

        // Validate if the post exists
        if (post) {
            const existingPost = await Post.findById(post);
            if (!existingPost) {
                return res.status(404).json({ message: 'Post not found' });
            }
        }

        const comment = await Comment.findByIdAndUpdate(req.params.id, { text, post }, { new: true, runValidators: true });
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json(comment);
    } catch (error) {
        if (error.name === 'ValidationError') {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// Delete a comment
export const deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }
        res.status(200).json({ message: 'Comment deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
