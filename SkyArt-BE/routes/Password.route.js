import { Router } from "express";
import {requestPasswordReset, verifyResetToken, resetPassword } from '../controllers/PasswordController.js';

const router = Router();

router.post('/reset', requestPasswordReset);
router.get('/reset/:token', verifyResetToken);
router.post('/reset/:token', resetPassword);


export default router;