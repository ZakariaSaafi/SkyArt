// artist.js
import mongoose from "mongoose";
import  User from '../models/User.js';

const artistSchema = new mongoose.Schema({
    phoneNumber : {
        type: String,
        required: [true]
    },
    followers : {
        type: [String],
        required: [true]
    },
    following : {
        type: [String],
        required: [true]
    }, 
    biohraphy : {
        type: String,
        required: [true]
    }
});

// Discrimination - Artist est un sous-type de User

export default User.discriminator('Artist', artistSchema);
