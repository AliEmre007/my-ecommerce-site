// server/controllers/orderController.js
import Order from '../models/orderModel.js';

/**
 * @desc    Create a new order
 * @route   POST /api/orders
 * @access  Public (we'll make this private later)
 */
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

export { addOrderItems };