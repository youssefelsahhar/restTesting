import axios from 'axios';

// Add product to the cart
export const addToCart = async (userId, productId, quantity = 1) => {
  try {
    const cartData = {
      userId: userId,
      productId: productId,
      quantity: quantity,
    };

    const response = await axios.post('http://localhost:4000/cart/add', cartData);
    return response.data; // Return response data if needed
  } catch (error) {
    throw new Error('Error adding to cart: ' + error.message);
  }
};

// Fetch user cart (if needed for later usage)
export const fetchCart = async (userId) => {
  try {
    const response = await axios.get(`http://localhost:4000/cart/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error('Error fetching cart: ' + error.message);
  }
};
