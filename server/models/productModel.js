import mongoose from 'mongoose';

// A Mongoose Schema is the blueprint for our data
const productSchema = new mongoose.Schema(
  {
    // We'll add a 'user' field later (to track who created the product)
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    inStock: {
      type: Number,
      required: true,
      default: 0,
    },
    // We'll add 'reviews' here later
  },
  {
    // 'timestamps' automatically adds 'createdAt' and 'updatedAt' fields
    timestamps: true,
  }
);

// We then create a 'Model' from the schema.
// This is the object we'll use to actually find, create, and update products.
const Product = mongoose.model('Product', productSchema);

export default Product;