import express from 'express';
const router = express.Router();
import {
  addOrderItems,
  getOrderById,
  updateOrderToPaid,
  createPaymentIntent,
  getMyOrders,
  getOrders, // 1. Import
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // 2. Import admin

router.route('/myorders').get(protect, getMyOrders);

router
  .route('/')
  .post(protect, addOrderItems)
  .get(protect, admin, getOrders); // 3. Add GET route (Admin only)

router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/create-payment-intent').post(protect, createPaymentIntent);

export default router;