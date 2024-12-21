const mongoose = require('mongoose');

// Order Schema
const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
    },
  ],
  status: { type: String, enum: ['pending', 'preparing', 'out for delivery', 'delivered', 'canceled'], default: 'pending' },
  totalAmount: { type: Number, required: true },
  deliveryAddress: { type: String, required: true },
  paymentMethod: { type: String, required: true },
  specialInstructions: { type: String },
  orderDate: { type: Date, default: Date.now },
  email: { type: String, required: true }, 
  phone: { type: String, required: true }, 
});

module.exports = mongoose.model('Order', orderSchema);
