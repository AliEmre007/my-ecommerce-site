// 1. We now use 'import' syntax for everything
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js'; // 2. Import our new DB connection

// 3. We must call config() at the top
dotenv.config();

// 4. Run the connection
connectDB();

// 5. We'll remove the dummy products array in the next step
const products = [
  { _id: '1', name: 'Classic T-Shirt', /* ... */ },
  { _id: '2', name: 'Leather Wallet', /* ... */ },
  { _id: '3', name: 'Canvas Backpack', /* ... */ },
];

const app = express();
const PORT = process.env.PORT || 5000; // Good practice to use env variable

app.get('/', (req, res) => {
  res.send('Hello from the E-commerce Server!');
});

// --- API Routes ---
app.get('/api/products', (req, res) => {
  res.json(products);
});

app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

// We will add new routes for 'orders' here

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});