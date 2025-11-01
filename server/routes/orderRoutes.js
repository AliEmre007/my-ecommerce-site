import express from 'express';
const router = express.Router();
import { 
  addOrderItems, 
  getOrderById,
  updateOrderToPaid,
  createPaymentIntent // 1. Import
} from '../controllers/orderController.js';

router.route('/').post(addOrderItems);
router.route('/:id').get(getOrderById);
router.route('/:id/pay').put(updateOrderToPaid);

// 2. Add the new payment intent route
router.route('/:id/create-payment-intent').post(createPaymentIntent);

export default router;