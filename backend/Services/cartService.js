const Cart = require('../models/CartSchema');

// Add product to the cart
exports.addToCart = async ({ userId, productId, quantity }) => {
  try {
    let cart = await Cart.findOne({ userId });
    
    if (!cart) {
      // If no cart exists for this user, create a new one
      cart = new Cart({
        userId,
        products: [{ productId, quantity }],
      });
    } else {
      // Check if the product already exists in the cart
      const existingProductIndex = cart.products.findIndex(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingProductIndex !== -1) {
        // Product already in cart, update the quantity
        cart.products[existingProductIndex].quantity += quantity;
      } else {
        // Add the new product to the cart
        cart.products.push({ productId, quantity });
      }
    }

    // Save the cart
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error('Error adding product to cart');
  }
};
