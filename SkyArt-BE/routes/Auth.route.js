import { Router } from "express";
import {signup , login} from '../controllers/UserController.js';
import multer from "multer";


const router = Router();

// Multer configuration
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + file.originalname.slice(file.originalname.lastIndexOf('.')));
    }
  });
  const upload = multer({ storage });

  
  

router.post('/signup', upload.single('image'), signup);
router.post('/login', login);

export default router;