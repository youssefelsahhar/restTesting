const Order = require('./moduls/OrderSchema');
const Product = require('./moduls/ProductSchema');


// Service for handling order placement
// Imperative Pattern:bec i explicitly define the steps
// that the program needs to take to achieve a desired result. It’s step-by-step, focusing on how to do something.
class OrderService {
  
  async placeOrder({ userId, products, deliveryAddress, paymentMethod, specialInstructions = '', email, phone }) {
    try {
      if (!Array.isArray(products) || products.length === 0) {
        throw new Error('Products must be a non-empty array');
      }

      let totalAmount = 0;
      const productDetails = [];

      // Imperatively check each product
      for (let item of products) {
        if (!item.productId || !item.quantity) {
          throw new Error('Each product must have a productId and quantity');
        }

        const product = await Product.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        if (product.stock < item.quantity) {
          throw new Error(`Not enough stock for product: ${product.name}`);
        }

        totalAmount += product.price * item.quantity;

        productDetails.push({
          productId: item.productId,
          quantity: item.quantity,
        });

        // Decrease stock after the order is placed
        product.stock -= item.quantity;
        await product.save();  // Save updated product stock
      }

      // Create the order object
      const newOrder = new Order({
        userId,
        products: productDetails,
        totalAmount,
        deliveryAddress,
        paymentMethod,
        specialInstructions,
        email,  // Add email field
        phone,  // Add phone field
      });

      // Save the order to the database
      const savedOrder = await newOrder.save();

      return savedOrder; // Return the saved order
    } catch (error) {
      throw error; // Propagate the error to the controller
    }
  }



  async getOrderStatus(orderId) {
    try {
      const order = await Order.findById(orderId);
      if (!order) {
        throw new Error('Order not found');
      }
      return order.status; // or any other relevant field
    } catch (error) {
      throw new Error('Error retrieving order status');
    }
  }

 // **Update Order Status**
async updateOrderStatus(orderId, newStatus) {
  try {
    const order = await Order.findById(orderId);
    if (!order) {
      throw new Error('Order not found');
    }

    // Get the time difference between now and the order's creation time
    const orderTime = new Date(order.orderDate); 
    const currentTime = new Date();

    // Calculate the time difference in minutes
    const timeDifferenceInMinutes = (currentTime - orderTime) / 1000 / 60;

    // If more than 15 minutes have passed, do not allow deletion (status change to 'canceled')
    if ( timeDifferenceInMinutes > 15) {
      throw new Error('Order cannot be canceled because more than 15 minutes have passed since it was placed.');
    }

    // Otherwise, update the status of the order
    order.status = "canceled"; // Update status to 'canceled'
    await order.save();
    return { message: 'Order status updated successfully', order }; // Return updated order and success message

  } catch (error) {
    throw new Error(error.message || 'Error updating order status');
  }
}

  

  

  async getAllOrdersByUserId(userId) {
    try {
      // Fetch all orders for a given userId and sort by orderDate (most recent first)
      const orders = await Order.find({ userId: userId }).sort({ orderDate: -1 });

      if (!orders || orders.length === 0) {
        throw new Error('No orders found for this user');
      }

      return orders;
    } catch (error) {
      throw new Error(error.message);
    }
  }

}

module.exports = new OrderService();
