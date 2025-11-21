import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct, // 1. Import
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js'; // 2. Import

router.route('/').get(getProducts);

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct); // 3. Add the DELETE route

export default router;