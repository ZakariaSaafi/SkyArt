import Category from "../models/Category.js";

export const addCategory = async (req, res) => {
    try {
        const category = await Category.create(req.body);
        res.status(201).json(category);
    } catch (error) {
        if (error.code === 11000) {
            res.status(409).json({ message: error.message });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
}

export const getCategoryById = async (req, res) => {
    try {
        const postId = req.params.id;
        const post = await Category.findById(postId);
        if (!post) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const postId = req.params.id;
        const { title, description, files, dateCreated, isAsset, assetPrice } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(
            postId,
            { title, description, files, dateCreated, isAsset, assetPrice },
            { new: true }
        );
        if (!updatedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(updatedCategory);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

export const deleteCategory = async (req, res) => {
    try {
        const postId = req.params.id;
        const deletedCategory = await Category.findByIdAndDelete(postId);
        if (!deletedCategory) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};