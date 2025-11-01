// server/controllers/orderController.js
import Order from '../models/orderModel.js';
import stripe from 'stripe';
// Initialize the Stripe client with your secret key
const stripeClient = stripe(process.env.STRIPE_SECRET_KEY);

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Public (we'll make this private later)
 */

/**
 * @desc    Get an order by ID
 * @route   GET /api/orders/:id
 * @access  Public (we'll make this private later)
 */
const getOrderById = async (req, res) => {
  try {
    // 1. Find the order by its ID
    const order = await Order.findById(req.params.id)
      // 2. 'populate' is a powerful Mongoose tool.
      // Right now, the order only has the 'product ID'.
      // .populate('product') would fetch the full product details.
      // We don't need it *yet*, but it's good to know about.
      // .populate('user', 'name email'); // Example of populating user
    
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error fetching order: ${error.message}` });
  }
};

/**
 * @desc    Update order to paid
 * @route   PUT /api/orders/:id/pay
 * @access  Private (for now, public)
 */
const updateOrderToPaid = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      // 1. Set the order to paid
      order.isPaid = true;
      order.paidAt = Date.now();
      
      // 2. Save the payment details from Stripe (sent in the req body)
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.receipt_email, // Stripe calls this receipt_email
      };

      // 3. Save the updated order to the database
      const updatedOrder = await order.save();
      
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating order: ${error.message}` });
  }
};

/**
 * @desc    Create a new stripe payment intent
 * @route   POST /api/orders/:id/create-payment-intent
 * @access  Private (for now, public)
 */
const createPaymentIntent = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order && !order.isPaid) {
      // 1. Total price must be in the smallest currency unit (e.g., cents)
      // We also use Math.round to avoid any floating point issues
      const amountInCents = Math.round(order.totalPrice * 100);

      // 2. Create the Payment Intent with Stripe
      const paymentIntent = await stripeClient.paymentIntents.create({
        amount: amountInCents,
        currency: 'usd', // You can change this to your local currency
        // We can add customer/metadata later
      });

      // 3. Send the secret back to the frontend
      res.send({
        client_secret: paymentIntent.client_secret,
      });

    } else if (order.isPaid) {
      res.status(400).json({ message: 'Order is already paid' });
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error creating payment intent: ${error.message}` });
  }
};


const addOrderItems = async (req, res) => {
  try {
    // 1. Get all the order data from the frontend's request body
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    } = req.body;

    // 2. Check if the cart is empty
    if (orderItems && orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    } else {
      // 3. Create a new order instance in memory
      const order = new Order({
        orderItems: orderItems.map((item) => ({
          ...item,
          product: item._id, // Link to the product in the DB
          _id: undefined, // Let MongoDB create a new _id for this sub-document
        })),
        user: req.user._id,
        shippingAddress,
        paymentMethod,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        // We'll add the 'user' here later
      });

      // 4. Save the new order to the database
      const createdOrder = await order.save();

      // 5. Send the newly created order back to the frontend
      res.status(201).json(createdOrder);
    }
  } catch (error) {
    res.status(500).json({ message: `Error creating order: ${error.message}` });
  }
};

export { addOrderItems, getOrderById, updateOrderToPaid, createPaymentIntent };