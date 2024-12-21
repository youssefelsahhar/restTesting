const OrderService = require('../orderServices');
const Order = require('../moduls/OrderSchema');

// Controller for placing an order
const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;  // Regex for email validation
const phoneRegex = /^\+?\d{1,4}[\s\-]?\(?\d{1,4}\)?[\s\-]?\d{1,4}[\s\-]?\d{1,4}$/;  // Regex for phone number validation

exports.placeOrder = async (req, res) => {
  const { userId, products, deliveryAddress, paymentMethod, specialInstructions, email, phone } = req.body;

  // Validate email
  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ message: 'Email address must be written in English and in the correct format (e.g., name@example.com)' });
  }

  // Validate phone number
  if (!phone || !phoneRegex.test(phone)) {
    return res.status(400).json({ message: 'Phone number must only contain digits and follow the correct format (e.g., +201234567890)' });
  }

  // Validate products array
  if (!Array.isArray(products) || products.length === 0) {
    return res.status(400).json({ message: 'Products must be a non-empty array' });
  }

  try {
    // Call the OrderService to handle order placement
    const order = await OrderService.placeOrder({ userId, products, deliveryAddress, paymentMethod, specialInstructions, email, phone });

    // Return success response
    res.status(201).json({ message: 'Order placed successfully', order });

  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



// Controller for tracking an order

exports.trackOrder = async (req, res) => {
  const { orderId } = req.params;

  try {
    // Call the service to get order status
    const orderStatus = await OrderService.getOrderStatus(orderId);

    // Respond with the order status
    res.status(200).json({
      orderStatus: orderStatus
    });
  } catch (error) {
    res.status(404).json({
      message: error.message || "Order not found."
    });
  }
};


  // Update order status
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

  exports.getAllOrdersByUserId = async (req, res) => {
    const { userId } = req.params;  // Extract userId from the request parameters
  
    try {
      // Call service to get all orders for the user
      const orders = await OrderService.getAllOrdersByUserId(userId);
  
      // Return the list of orders
      res.status(200).json({ orders });
    } catch (error) {
      res.status(404).json({ message: error.message });  // Handle error if no orders are found
    }
  };
  



