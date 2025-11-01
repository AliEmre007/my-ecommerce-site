import express from 'express';
const router = express.Router();
import { 
  addOrderItems, 
  getOrderById,
  updateOrderToPaid // 1. Import new function
} from '../controllers/orderController.js';

router.route('/').post(addOrderItems);
router.route('/:id').get(getOrderById);

// 2. Add the new 'pay' route
router.route('/:id/pay').put(updateOrderToPaid);


export default router;