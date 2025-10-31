import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js'; // 1. Import new routes

dotenv.config();
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from the E-commerce Server!');
});

// 2. Tell Express to use your new product routes
// Any request to '/api/products' will now be handled by 'productRoutes'
app.use('/api/products', productRoutes);

// 3. We have now DELETED the old, hard-coded product routes and dummy data

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});