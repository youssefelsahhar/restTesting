import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateProductPage() {
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: '',
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Send POST request to the server to add the product
    axios
      .post('http://localhost:4000/products/create', product)
      .then((response) => {
        alert('Product created successfully!');
        navigate('/AdminDashboard'); // Navigate to the admin dashboard after successful creation
      })
      .catch((error) => {
        console.error('Error creating product:', error);
        alert('Failed to create product.');
      });
  };

  return (
    <div>
      <h2>Create New Product</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price ($):</label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Image URL:</label>
          <input
            type="text"
            name="image"
            value={product.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
}

export default CreateProductPage;
