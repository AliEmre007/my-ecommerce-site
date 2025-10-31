const express = require('express');
const mongoose = require('mongoose'); // 1. Import mongoose
require('dotenv').config(); // 2. Import dotenv to load .env variables

// 3. Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected...');
  } catch (err) {
    console.error(err.message);
    process.exit(1); // Exit with failure
  }
};

connectDB(); // 4. Run the connection function

// Dummy data for our products
const products = [
  {
    _id: '1',
    name: 'Classic T-Shirt',
    description: 'A comfortable, 100% cotton classic t-shirt.',
    price: 25.99,
    image: '/images/t-shirt.jpg',
    inStock: 10,
  },
  {
    _id: '2',
    name: 'Leather Wallet',
    description: 'A stylish and durable leather wallet.',
    price: 45.50,
    image: '/images/wallet.jpg',
    inStock: 5,
  },
  {
    _id: '3',
    name: 'Canvas Backpack',
    description: 'A sturdy backpack for all your needs.',
    price: 79.99,
    image: '/images/backpack.jpg',
    inStock: 8,
  },
];

const app = express();
const PORT = 5000;

// A simple "test" route to make sure the server is working
app.get('/', (req, res) => {
  res.send('Hello from the E-commerce Server!');
});

// --- API Routes ---

// @desc    Fetch all products
// @route   GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// @desc    Fetch a single product by ID
// @route   GET /api/products/:id
app.get('/api/products/:id', (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});


// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});