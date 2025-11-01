import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  createPaymentIntent,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js'; // 1. Import

// 2. Add 'protect' to each route
router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/create-payment-intent').post(protect, createPaymentIntent);

export default router;