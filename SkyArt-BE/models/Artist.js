// artist.js
import mongoose from "mongoose";
import  User from '../models/User.js';

const artistSchema = new mongoose.Schema({
    phoneNumber : {
        type: String,
        required: [true]
    },
    bioghraphy : {
        type: String,
        required: [true]
    },
    ratings: [
        {
            userId: { type: String },
            rating: { type: Number, min: 1, max: 5 }
        }
    ],
    averageRating: { 
        type: Number, default: 0
     },
     following: [{ 
       type : String
     }]
});

// La methode de calcule le moyenne de rating
artistSchema.methods.calculateAndSetAverageRating = function() {
    const totalRatings = this.ratings.length;
    if (totalRatings === 0) {
        this.averageRating = 0;
    } else {
        const sum = this.ratings.reduce((acc, rating) => acc + rating.rating, 0);
        this.averageRating = sum / totalRatings;
    }
};

// Middleware pour calculer automatiquement le moyenne de rating et l'enregistrer
artistSchema.pre('save', function(next) {
    this.calculateAndSetAverageRating();
    next();
});


// Discrimination - Artist est un sous-type de User

export default User.discriminator('Artist', artistSchema);
