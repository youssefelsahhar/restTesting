const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Routes for order management
router.post('/', orderController.placeOrder);  //  match POST /orders
router.get('/:orderId', orderController.trackOrder); //  track orders by orderId
router.get('/user/:userId', orderController.getAllOrdersByUserId); // get all orders by userId
router.put('/:orderId', orderController.updateOrderStatus); // update order status by orderId
module.exports = router;
