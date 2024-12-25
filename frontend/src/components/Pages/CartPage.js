// src/components/CartPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CartPage() {
  const [cart, setCart] = useState([]);
  const userId = localStorage.getItem('id');  // Assuming user ID is stored in localStorage after login

  useEffect(() => {
    if (!userId) {
      alert('Please log in to view your cart');
      return;
    }

    axios
      .get(`http://localhost:4000/cart/${userId}`)
      .then((response) => {
        setCart(response.data);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
      });
  }, [userId]);

  return (
    <div>
      <h1>Your Cart</h1>
      <ul>
        {cart.map((item, index) => (
          <li key={index}>Product ID: {item.productId} | Quantity: {item.quantity}</li>
        ))}
      </ul>
    </div>
  );
}

export default CartPage;
