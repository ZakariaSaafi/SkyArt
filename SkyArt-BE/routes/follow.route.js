import { Router } from "express";
import {followArtist, getAllFollowings, getAllFollowers} from '../controllers/FollowController.js';

const router = Router();

// Follow an artist
router.post('/follow', followArtist);
router.get('/getAll', getAllFollowings);
router.get('/getAllFollowers', getAllFollowers);

export default router;