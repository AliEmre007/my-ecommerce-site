// server/routes/productRoutes.js
import express from 'express';
const router = express.Router();
import { getProducts, getProductById } from '../controllers/productController.js';

// When a GET request comes to '/', use the getProducts function
router.route('/').get(getProducts);

// When a GET request comes to '/:id', use the getProductById function
router.route('/:id').get(getProductById);

export default router;