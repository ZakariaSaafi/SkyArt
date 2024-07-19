import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import  User from '../models/User.js';

export const signup = async (req, res) => {
    try {
        const imagePath = req.file ? `./public/uploads/${req.file.filename}` : null;
        const { name, email, password } = req.body;
        const find = await User.findOne({ email });
        if (find) {
            res.status(409).json({ message: 'User already exists with this email' });
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword, image: imagePath });
        await user.save();
        res.status(201).json({ message: 'User created successfully' , user : user});
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        const validPassword = bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '24h' });
        res.status(200).json({ token , user: user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const userId = req.params.id; // Assuming the ID is passed as a route parameter
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json({ user });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
};