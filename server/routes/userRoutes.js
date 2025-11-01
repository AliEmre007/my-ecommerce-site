import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile, // 1. Import
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js'; // 2. Import

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// 3. Add the new protected route
// GET to /api/users/profile
router.route('/profile').get(protect, getUserProfile);

export default router;