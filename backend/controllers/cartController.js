const mongoose = require('mongoose');
const User = require('../moduls/UserSchema');
const Product = require('../moduls/ProductSchema');
const Cart = require('../moduls/CartSchema');

// Assuming you already have a user and product in your database
const userId = 'userObjectId';  // Replace with actual User ObjectId
const productId = 'productObjectId';  // Replace with actual Product ObjectId

// Create a new cart
const newCart = new Cart({
  userId: mongoose.Types.ObjectId(userId),
  products: [
    { productId: mongoose.Types.ObjectId(productId), quantity: 2 }  // Example: 2 products
  ]
});

// Save cart to the database
newCart.save()
  .then(cart => {
    console.log('Cart saved:', cart);
  })
  .catch(err => {
    console.error('Error saving cart:', err);
  });
