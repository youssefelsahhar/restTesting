import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ViewCartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    deliveryAddress: '',
    specialInstructions: '',
    paymentMethod: '', // Add paymentMethod field
  });

  useEffect(() => {
    const userId = localStorage.getItem('id'); // Retrieve the userId from localStorage

    if (!userId) {
      setError('User not logged in.');
      setIsLoading(false);
      return;
    }

    axios.get(`http://localhost:4000/cart/${userId}`) // Pass userId in the URL
      .then((response) => {
        setCartItems(response.data.products); // Products are populated in the response
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching cart:', error);
        setError('Failed to fetch cart. Please try again.');
        setIsLoading(false);
      });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePlaceOrder = () => {
    const userId = localStorage.getItem('id'); // Retrieve userId from local storage

    if (!userId) {
      setError('User not logged in.');
      return;
    }

    const orderData = {
      userId,
      products: cartItems.map((item) => ({
        productId: item.productId._id,
        quantity: item.quantity,
      })),
      ...formData, // Spread the form data to include payment method
    };

    axios.post('http://localhost:4000/orders', orderData)
      .then((response) => {
        alert('Order placed successfully!');
        setCartItems([]); // Clear cart
      })
      .catch((error) => {
        console.error('Error placing order:', error);
        alert('Failed to place order. Please try again.');
      });
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p style={{ color: 'red' }}>{error}</p>;
  }

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <li key={item.productId._id}>
                <p>{item.productId.name} - ${item.productId.price}</p>
                <p>Quantity: {item.quantity}</p>
                <p>Total: ${item.productId.price * item.quantity}</p>
              </li>
            ))}
          </ul>
          <div>
            <h3>Place Your Order</h3>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Phone:
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Delivery Address:
              <input
                type="text"
                name="deliveryAddress"
                value={formData.deliveryAddress}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Special Instructions:
              <textarea
                name="specialInstructions"
                value={formData.specialInstructions}
                onChange={handleInputChange}
              />
            </label>
            <br />
            <label>
              Payment Method:
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
              >
                <option value="">Select Payment Method</option>
                <option value="creditCard">Credit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cashOnDelivery">Cash on Delivery</option>
              </select>
            </label>
            <br />
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        </>
      )}
    </div>
  );
}

export default ViewCartPage;
