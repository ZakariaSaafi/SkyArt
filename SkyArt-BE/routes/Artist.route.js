import { Router } from "express";
import {signup , login , getAllArtists, rateArtist} from '../controllers/ArtistController.js';

const router = Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/getAll', getAllArtists);
router.post('/:id/rate', rateArtist);

export default router;