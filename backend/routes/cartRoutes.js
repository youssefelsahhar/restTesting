const express = require('express');
const router = express.Router();
const Cart = require('../moduls/CartSchema');
const Product = require('../moduls/ProductSchema'); // Replace with the correct path to your Product model
const mongoose = require('mongoose');

// Create a cart
router.post('/add', async (req, res) => {
    const { userId, productId, quantity } = req.body;
  
    // Check if userId is valid MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ message: 'Invalid userId' });
    }
  
    try {
      // Check if the product exists in the database
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Check if the cart exists for the user
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        // If no cart, create a new one
        cart = new Cart({ userId, products: [] });
      }
  
      // Check if product is already in the cart
      const productInCart = cart.products.find(
        (item) => item.productId.toString() === productId
      );
  
      if (productInCart) {
        // If product exists in cart, increase the quantity
        productInCart.quantity += quantity;
      } else {
        // Otherwise, add new product to cart
        cart.products.push({ productId, quantity });
      }
  
      // Save the cart
      await cart.save();
  
      res.status(200).json({ message: 'Product added to cart', cart });
    } catch (error) {
      console.error('Error adding to cart:', error);
      res.status(500).json({ message: 'Error adding product to cart', error: error.message });
    }
  });

// Fetch a cart by userId
router.get('/:userId', (req, res) => {
  const userId = req.params.userId;

  Cart.findOne({ userId })
    .populate('products.productId')
    .then(cart => {
      if (cart) {
        res.json(cart);
      } else {
        res.status(404).json({ error: 'Cart not found' });
      }
    })
    .catch(err => {
      res.status(500).json({ error: 'Error fetching cart', details: err });
    });
});

module.exports = router;
