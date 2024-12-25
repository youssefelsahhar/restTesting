// src/components/ProductForm.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    // Fetch all products from the backend
    axios
      .get('http://localhost:4000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      setName(selectedProduct.name);
      setPrice(selectedProduct.price);
      setDescription(selectedProduct.description);
    }
  }, [selectedProduct]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedProduct) {
      // Update the existing product
      axios
        .put(`http://localhost:4000/products/${selectedProduct._id}`, {
          name,
          price,
          description,
        })
        .then(() => {
          // Reset the form and product list after editing
          setSelectedProduct(null);
          fetchProducts();
        })
        .catch((error) => {
          console.error('Error updating product:', error);
        });
    } else {
      // Create a new product
      axios
        .post('http://localhost:4000/products', { name, price, description })
        .then(() => {
          // Clear form fields after creating
          setName('');
          setPrice('');
          setDescription('');
          fetchProducts();
        })
        .catch((error) => {
          console.error('Error creating product:', error);
        });
    }
  };

  const handleDelete = (productId) => {
    axios
      .delete(`http://localhost:4000/products/${productId}`)
      .then(() => {
        // Remove product from the state without refetching the entire list
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== productId)
        );
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleEdit = (product) => {
    setSelectedProduct(product);
  };

  const fetchProducts = () => {
    axios
      .get('http://localhost:4000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  };

  return (
    <div>
      <h2>{selectedProduct ? 'Edit Product' : 'Create New Product'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <button type="submit">
          {selectedProduct ? 'Update Product' : 'Create Product'}
        </button>
      </form>

      <h2>Product List</h2>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleEdit(product)}>Edit</button>
            <button onClick={() => handleDelete(product._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;
