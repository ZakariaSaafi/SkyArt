import { Router } from "express";
import {signup , login , getUserById} from '../controllers/UserController.js';

const router = Router();


router.post('/signup', signup);
router.post('/login', login);
router.get('/:id',getUserById );

export default router;