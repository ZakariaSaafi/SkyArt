import { Router } from "express";
import {signup , login , getAllArtists, rateArtist, getArtistById} from '../controllers/ArtistController.js';
import multer from "multer";
const router = Router();

const storage = multer.diskStorage({
  destination: './public/uploads/',
  filename: function(req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.')));
  }
});
const upload = multer({ storage });

router.post('/signup', upload.single('image'), signup);
router.post('/login', login);
router.get('/getAll', getAllArtists);
router.post('/:id/rate', rateArtist);
router.get('/:id',getArtistById );

export default router;