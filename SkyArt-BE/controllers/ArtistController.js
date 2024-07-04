import bcrypt  from 'bcrypt';
import jwt from 'jsonwebtoken';
import Artist from '../models/Artist.js';

export const signup = async (req, res) => {
    try {
        const imagePath = req.file ? `./public/uploads/${req.file.filename}` : null;
        const { name, email, password, phoneNumber, bioghraphy} = req.body;
        const find = await Artist.findOne({ email });
        if (find) {
            res.status(409).json({ message: 'Artist already exists with this email' });
        } 
        const hashedPassword = await bcrypt.hash(password, 10);
        const artist = new Artist({ name, email, password: hashedPassword, phoneNumber, bioghraphy, image: imagePath });
        await artist.save();
        res.status(201).json({ message: 'Artist created successfully' });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const artist = await Artist.findOne({ email });
        if (!artist) {
            return res.status(404).json({ message: 'artist not found' });
        }
        const validPassword =  bcrypt.compare(password, artist.password);
        if (!validPassword) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign({ artistId: artist._id }, 'secret_key', { expiresIn: '24h' });
        res.status(200).json({ token , Artist : artist });
    } catch (error) {
        res.status(500).json({ message: 'An error occurred' });
    }
    
};

export const getAllArtists = async (req, res) => {
    try {
        const artists = await Artist.find();
        res.json(artists);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const rateArtist = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ message: 'Artist not found' });

        const existingRating = artist.ratings.find(r => r.userId === req.body.userId);
        if (existingRating) {
            // Update the existing rating
            existingRating.rating = req.body.rating;
        } else {
            // Add a new rating
            artist.ratings.push({ userId: req.body.userId, rating: req.body.rating });
        }

        await artist.save();
        res.json(artist);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


