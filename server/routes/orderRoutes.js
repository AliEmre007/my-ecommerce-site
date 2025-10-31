// server/routes/orderRoutes.js
import express from 'express';
const router = express.Router();
import { addOrderItems } from '../controllers/orderController.js';

// When a POST request comes to '/', use the addOrderItems function
router.route('/').post(addOrderItems);

// We'll add routes like '/:id' (to get an order) later

export default router;