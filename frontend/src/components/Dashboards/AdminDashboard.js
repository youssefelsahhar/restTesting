import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch products from the backend
    axios
      .get('http://localhost:4000/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });

    // Fetch users from the backend
    axios
      .get('http://localhost:4000/users') // Assume endpoint for users
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('Error fetching users:', error);
      });
  }, []);

  const handleCreateProduct = () => {
    navigate('/create-product'); // Navigate to the product creation page
  };

  const handleCreateUser = () => {
    navigate('/create-user'); // Navigate to the user creation page
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`); // Navigate to the edit product page
  };

  const handleDeleteProduct = (productId) => {
    axios
      .delete(`http://localhost:4000/products/${productId}`)
      .then(() => {
        alert('Product deleted successfully');
        setProducts(products.filter((product) => product._id !== productId)); // Remove from the state without refetching
      })
      .catch((error) => {
        console.error('Error deleting product:', error);
      });
  };

  const handleEditUser = (userId) => {
    navigate(`/edit-user/${userId}`); // Navigate to the edit user page
  };

  const handleDeleteUser = (userId) => {
    axios
      .delete(`http://localhost:4000/users/${userId}`)
      .then(() => {
        alert('User deleted successfully');
        setUsers(users.filter((user) => user._id !== userId)); // Remove from the state without refetching
      })
      .catch((error) => {
        console.error('Error deleting user:', error);
      });
  };

  return (
    <div>
      {/* Styles */}
      <style>
        {`
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
          .product-item h3 {
            font-size: 16px;
            margin-bottom: 10px;
          }
          .product-item p {
            font-size: 14px;
            color: #555;
            margin-bottom: 10px;
          }
          .button {
            background-color: #007bff;
            color: white;
            border: none;
            padding: 10px 15px;
            cursor: pointer;
            border-radius: 5px;
            margin-top: 10px;
          }
          .button:hover {
            background-color: #0056b3;
          }
          .button-delete {
            background-color: #dc3545;
            margin-top: 10px;
          }
          .button-delete:hover {
            background-color: #c82333;
          }

          /* Styles for Users Table */
          .users-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 30px;
          }
          .users-table th, .users-table td {
            padding: 12px;
            text-align: left;
            border: 1px solid #ddd;
          }
          .users-table th {
            background-color: #f4f4f4;
          }
        `}
      </style>

      {/* Product List Section */}
      <h2>Products</h2>
      <button onClick={handleCreateProduct} className="button">
        Create Product
      </button>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id} className="product-item">
            <img src={product.image} alt={product.name} />
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>${product.price}</p>
            <button onClick={() => handleEditProduct(product._id)} className="button">
              Edit
            </button>
            <button onClick={() => handleDeleteProduct(product._id)} className="button button-delete">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Users Table Section */}
      <h2>Users</h2>
      <button onClick={handleCreateUser} className="button">
        Add User
      </button>
      <table className="users-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button onClick={() => handleEditUser(user._id)} className="button">
                  Edit
                </button>
                <button onClick={() => handleDeleteUser(user._id)} className="button button-delete">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
