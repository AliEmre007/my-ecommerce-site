import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // 1. Import new order routes

dotenv.config();
connectDB();

const app = express();

// 2. Add this middleware to parse JSON bodies
// This MUST be before your routes
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Hello from the E-commerce Server!');
});

// 3. Tell Express to use your routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes); // 4. Add the new order routes

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});