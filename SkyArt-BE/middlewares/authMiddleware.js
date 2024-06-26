import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from "../models/User.js";
const authMiddleware = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'secret_key');
        req.userData = { userId: decodedToken.userId };
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed' });
    }
};

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Check if Authorization header is present and starts with Bearer
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Extract token from Authorization header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, 'secret_key');  // Replace 'secret_key' with your actual secret key

            // Fetch user details from database
            req.user = await User.findById(decoded.userId).select('-password');

            // Proceed to the next middleware
            next();
        } catch (error) {
            console.error(error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    // If token is not present
    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
});
const admin = (req, res, next) => {
    if (req.user && req.user.isAdmin) {
        next();
    } else {
        res.status(401);
        throw new Error('Not authorized as an admin');
    }
};

export { protect, admin, authMiddleware };
