import Post from "../models/Post.js";

export const addPost = async (req, res) => {
    const { id, title, description, files, dateCreated, isAsset, assetPrice} = req.body;
 
    const post = new Post({ title, description, files, dateCreated, isAsset, assetPrice })
 
    try {
        await post.save();
        res.status(201).json(post );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
}

