import express from 'express';
const router = express.Router();
import { 
  addOrderItems, 
  getOrderById,
  updateOrderToPaid,
  createPaymentIntent,
  getMyOrders // 1. Import
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

// 2. Add the new route. 
// NOTE: It's important this is *before* the '/:id' route
// so 'myorders' isn't treated as an ID.
router.route('/myorders').get(protect, getMyOrders);

router.route('/').post(protect, addOrderItems);
router.route('/:id').get(protect, getOrderById);
router.route('/:id/pay').put(protect, updateOrderToPaid);
router.route('/:id/create-payment-intent').post(protect, createPaymentIntent);

export default router;