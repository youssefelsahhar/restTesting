const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');  // Added for handling Cross-Origin Requests
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const port = 4000;

// Middleware to parse JSON requests (use express's built-in json parser)
app.use(express.json());

// CORS middleware to handle cross-origin requests
app.use(cors());  // You can configure it as needed for your front-end

// MongoDB connection
const dbURI = 'mongodb+srv://janahagar:jana123@restaurant.s7jp4.mongodb.net/restaurants';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.log('Error connecting to MongoDB:', err));

// Use product and order routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/users', userRoutes); 

// Error handling middleware (optional but good practice)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
