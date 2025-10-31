import mongoose from 'mongoose';

// This is a "sub-schema" for items *within* an order
const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  // 'product' is a link to the original Product model
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
});

// This is the main Order blueprint
const orderSchema = new mongoose.Schema(
  {
    // We'll add a 'user' field later (who placed the order)
    
    orderItems: [orderItemSchema], // An array of items
    
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    
    paymentMethod: {
      type: String,
      required: true,
    },
    
    // We'll add 'paymentResult' here later (from PayPal/Stripe)

    taxPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt/updatedAt
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;