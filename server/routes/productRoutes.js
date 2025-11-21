import express from 'express';
const router = express.Router();
import {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct, // 1. Import
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router
  .route('/')
  .get(getProducts)
  .post(protect, admin, createProduct); // 2. Add POST route

router
  .route('/:id')
  .get(getProductById)
  .delete(protect, admin, deleteProduct);

export default router;