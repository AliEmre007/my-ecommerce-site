import path from 'path';
import { fileURLToPath } from 'url'; // Needed for ES Modules
import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js'; // 1. Import new order routes
import userRoutes from './routes/userRoutes.js';

dotenv.config();
connectDB();

const app = express();

// 2. Add this middleware to parse JSON bodies
// This MUST be before your routes
app.use(express.json());

const PORT = process.env.PORT || 5000;

// app.get('/', (req, res) => {
//   res.send('Hello from the E-commerce Server!');
// });

// 3. Tell Express to use your routes
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/users', userRoutes); 

// This route will send the Stripe Publishable Key to the frontend
app.get('/api/config/stripe', (req, res) => {
  res.send({ publishableKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

// --- DEPLOYMENT CONFIGURATION ---

// 1. Fix for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 2. Tell Express where the 'build' folder is
// We step out of 'server', into 'client', then 'build'
app.use(express.static(path.join(__dirname, '../client/build')));

// 3. For any route that isn't an API route, serve the React index.html
app.get(/^(.*)$/, (req, res) =>
  res.sendFile(path.resolve(__dirname, '../client', 'build', 'index.html'))
);
// --------------------------------

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});