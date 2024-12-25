import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProductPage() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    name: '',
    description: '',
    price: '',
    image: ''
  });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/products/${productId}`)
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error('Error fetching product details:', error);
      });
  }, [productId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/products/${productId}`, product)
      .then(() => {
        alert('Product updated successfully!');
        navigate('/AdminDashboard');
      })
      .catch((error) => {
        console.error('Error updating product:', error);
        alert('Failed to update product.');
      });
  };

  return (
    <div>
      <h2>Edit Product</h2>
      <form onSubmit={handleSaveChanges}>
        <div>
          <label>Name:</label>
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
          <input
            type="text"
            name="description"
            value={product.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Price:</label>
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
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/admin-dashboard')}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditProductPage;
