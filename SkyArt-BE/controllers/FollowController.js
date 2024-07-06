import  User from '../models/User.js';
import  Artist from '../models/Artist.js';


export const followArtist = async (req, res) => {

    try {
        const { userId, artistId } = req.body;

        // Find user and artist by IDs
        const user = await User.findById(userId);
        console.log(user);
        const artist = await Artist.findById(artistId);
        console.log(artist);

        if (!user || !artist) {
            return res.status(404).json({ message: 'User or artist not found' });
        }

        const userAlreadyFollows = user.followed.includes(artistId);
        const artistAlreadyFollowedByUser = artist.following.includes(userId);
        if (userAlreadyFollows || artistAlreadyFollowedByUser) {
            return res.status(400).json({ message: 'You already follow this artist' });
          
        } else {
            // Add a new rating
            user.followed.push(artistId);
            artist.following.push(userId);
            await user.save();
            await artist.save();
        }

        res.status(200).json({ message: 'Artist followed successfully' });
    } catch (err) {
        res.status(500).json({ message: err.message });
        console.log(err);
    }

}



export const getAllFollowings = async (req, res) => {
    try {
        const { artistId } = req.body;

        const artist = await Artist.findById(artistId);
        if (!artist) {
            return res.status(404).json({ message: 'Artist not found' });
        }

        const followingsIDs  =  artist.following ;
        const followings = await User.find({ _id: { $in: followingsIDs } });
        
        res.status(200).json({ followings });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}

export const getAllFollowers = async (req, res) => {
    try {
        const { userID } = req.body;

        const user = await User.findById(userID);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const followersIDs  =  user.followed ;
        const followers = await User.find({ _id: { $in: followersIDs } });
        
        res.status(200).json({ followers });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }

}