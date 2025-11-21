import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  createPaymentIntent,
  getMyOrders,
  getOrders,
  updateOrderToDelivered, // 1. Import
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/myorders').get(protect, getMyOrders);
router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/create-payment-intent').post(protect, createPaymentIntent);

// 2. Add the Deliver route (Admin only)
router.route('/:id/deliver').put(protect, admin, updateOrderToDelivered);

export default router;