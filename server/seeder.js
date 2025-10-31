// server/seeder.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// Import the data and models
import products from './data/products.js';
import Product from './models/productModel.js';
import Order from './models/orderModel.js';

dotenv.config();
connectDB();

// Function to import data
const importData = async () => {
  try {
    // 1. Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();

    // 2. Insert new data
    await Product.insertMany(products);

    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Function to destroy data
const destroyData = async () => {
  try {
    await Order.deleteMany();
    await Product.deleteMany();

    console.log('Data Destroyed!');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error}`);
    process.exit(1);
  }
};

// Check command line arguments to decide which function to run
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}