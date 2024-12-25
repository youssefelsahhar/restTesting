const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/userRoutes'); // Adjust the path as needed
const productRoutes = require('./routes/productRoutes');
const cartRoutes = require('./routes/cartRoutes');  // Adjust the path based on where your cartRoutes.js is located
const orderRoutes = require('./routes/orderRoutes');  // Adjust the path based on where your cartRoutes.js is located

const app = express();
const port = 4000;

// Middleware
app.use(express.json());
app.use(cors());

// MongoDB connection
const dbURI = 'mongodb+srv://youssefsahhar2406:EFoYQHcO2d5F49Le@cluster0.hka6d.mongodb.net/test';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Routes
app.use('/users', userRoutes);
app.use('/products', productRoutes);
app.use('/cart', cartRoutes); // Ensure the '/cart' base path is set up
app.use('/orders', orderRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
