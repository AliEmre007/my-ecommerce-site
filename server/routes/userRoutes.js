import express from 'express';
const router = express.Router();
import { registerUser, loginUser } from '../controllers/userController.js';

// POST to /api/users/register
router.route('/register').post(registerUser);

// POST to /api/users/login
router.route('/login').post(loginUser);

export default router;