import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile, // 1. Import
} from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

// 2. Chain the .get and .put requests for the same route
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile); // 3. Add this

export default router;