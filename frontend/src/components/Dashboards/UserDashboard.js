// src/components/UserDashboard.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function UserDashboard() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from backend
    axios
      .get('http://localhost:4000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  // Function to add product to the cart
  const addToCart = (productId) => {
    const userId = localStorage.getItem('id'); // Get userId from localStorage

    console.log("UserID:", userId); // Debugging line to check userId value

    if (!userId) {
      alert('Please log in to add products to your cart');
      return;
    }

    const cartData = {
      userId: userId,  // User ID taken from localStorage
      productId: productId,
      quantity: 1,  // Default quantity is 1
    };

    axios
      .post('http://localhost:4000/cart/add', cartData) // Make sure the URL is correct
      .then((response) => {
        alert('Product added to cart');
      })
      .catch((error) => {
        console.error('Error adding to cart:', error);
        alert('Failed to add product to cart');
      });
  };

  // Navigate to cart page
  const handleViewCart = () => {
    navigate('/cart');
  };

  return (
    <div>
      <style>
        {`
          .top-bar {
            display: flex;
            justify-content: flex-end;
            background-color: #f8f9fa;
            padding: 10px;
          }
          .view-cart-btn {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 5px;
            font-size: 14px;
          }
          .view-cart-btn:hover {
            background-color: #0056b3;
          }
          .product-list {
            display: flex;
            flex-wrap: wrap;
            gap: 20px;
            padding: 20px;
          }
          .product-item {
            border: 1px solid #ddd;
            padding: 15px;
            width: calc(25% - 20px);
            box-sizing: border-box;
            text-align: center;
            border-radius: 8px;
          }
          .product-item img {
            max-width: 100%;
            height: 150px;
            object-fit: cover;
            margin-bottom: 10px;
          }
          .product-item button {
            background-color: #28a745;
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 5px;
          }
          .product-item button:hover {
            background-color: #218838;
          }
        `}
      </style>

      <div className="top-bar">
        <button className="view-cart-btn" onClick={handleViewCart}>🛒 View Cart</button>
      </div>

      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product._id)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserDashboard;
