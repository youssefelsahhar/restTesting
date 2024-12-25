const OrderService = require('../Services/orderServices');
const Order = require('../moduls/OrderSchema');

// Regex patterns for email and phone validation
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
const phoneRegex = /^\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/;

// Controller to place an order
exports.placeOrder = async (req, res) => {
  const { userId, products, deliveryAddress, paymentMethod, specialInstructions, email, phone } = req.body;

  // Email validation
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Invalid email format.' });
  }

  // Phone number validation
  if (!phone || !phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Invalid phone number format.' });
  }

  // Validate products array
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Products must be a non-empty array.' });
  }

  try {
    // Call the service to place the order
    const order = await OrderService.placeOrder({ userId, products, deliveryAddress, paymentMethod, specialInstructions, email, phone });

    // Return success response
    res.status(201).json({ message: 'Order placed successfully', order });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to track an order
exports.trackOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Call the service to get order status
    const orderStatus = await OrderService.getOrderStatus(orderId);

    // Respond with the order status
    res.status(200).json({ orderStatus });
  } catch (error) {
    res.status(404).json({ message: error.message || "Order not found." });
  }
};

// Controller to update order status
exports.updateOrderStatus = async (req, res) => {
  const { orderId } = req.params;
  const { newStatus } = req.body;

  try {
    const updatedOrder = await OrderService.updateOrderStatus(orderId, newStatus);
    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Controller to get all orders by user ID
exports.getAllOrdersByUserId = async (req, res) => {
  const { userId } = req.params;

  try {
    const orders = await OrderService.getAllOrdersByUserId(userId);
    res.status(200).json({ orders });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
