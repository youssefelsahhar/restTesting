const Order = require('../moduls/OrderSchema');
const Product = require('../moduls/ProductSchema'); // Assuming you have a Product model to fetch product prices

// Service to place an order
exports.placeOrder = async ({ userId, products, deliveryAddress, paymentMethod, specialInstructions, email, phone }) => {
  // Calculate totalAmount by fetching product prices
  let totalAmount = 0;

  for (let productItem of products) {
    const product = await Product.findById(productItem.productId);
    if (!product) {
      throw new Error(`Product with ID ${productItem.productId} not found.`);
    }
    totalAmount += product.price * productItem.quantity;
  }

  const newOrder = new Order({
    userId,
    products,
    deliveryAddress,
    paymentMethod,
    specialInstructions,
    email,
    phone,
    totalAmount,  // Set totalAmount dynamically
    status: 'pending',  // Default order status
  });

  // Save the order to the database
  await newOrder.save();
  return newOrder;
};

// Service to get the status of an order
exports.getOrderStatus = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error('Order not found.');
  return order.status;
};

// Service to update the order status
exports.updateOrderStatus = async (orderId, newStatus) => {
  const order = await Order.findByIdAndUpdate(orderId, { status: newStatus }, { new: true });
  if (!order) throw new Error('Order not found.');
  return order;
};

// Service to get all orders by userId
exports.getAllOrdersByUserId = async (userId) => {
  const orders = await Order.find({ userId });
  if (!orders.length) throw new Error('No orders found.');
  return orders;
};
