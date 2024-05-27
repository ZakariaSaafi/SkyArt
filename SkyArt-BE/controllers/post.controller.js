import Post from "../models/Post.js";

export const addPost = async (req, res) => {
    await Post.create(req.body)
    .then(post =>res.status(201).json(post ))
    .catch(err =>   res.status(409).json({ message: error.message }))
}

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
      const { title, description, files, dateCreated, isAsset, assetPrice } = req.body;
      const updatedPost = await Post.findByIdAndUpdate(
        postId,
        { title, description, files, dateCreated, isAsset, assetPrice },
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