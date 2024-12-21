const mongoose = require('mongoose');

// Product Schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  category: { type: String },
  stock: { type: Number, default: 0 },
  image: { type: String }, // URL for the product image
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Product', productSchema);
