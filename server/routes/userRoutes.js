import express from 'express';
const router = express.Router();
import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  getUsers, // 1. Import controller
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // 2. Import admin middleware

router.route('/register').post(registerUser);
router.route('/login').post(loginUser);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// 3. Add the new Admin route
// GET /api/users
router.route('/').get(protect, admin, getUsers);

export default router;