// models/artist.js
const mongoose = require('mongoose');
const User = require('./User');

const artistSchema = new mongoose.Schema({
    // You don't need to define common fields here since they're inherited from the User class
    // Add any additional fields specific to the artist model
});

const artist = User.discriminator('Artist', artistSchema);

module.exports = artist;
