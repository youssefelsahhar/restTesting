import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateUserPage = () => {
  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user', // Default role
  });

  const [alertMessage, setAlertMessage] = useState(''); // To store the alert message
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!user.name || !user.email || !user.password) {
      setAlertMessage('Please fill out all fields.');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4000/users/create', user);
      if (response.status === 201) {
        setAlertMessage('User created successfully!');
        setTimeout(() => {
          navigate('/AdminDashboard');
        }, 2000);
      } else {
        setAlertMessage('Failed to create user.');
      }
    } catch (error) {
      // More detailed error message
      const errorMessage = error.response
        ? `Error: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`
        : `Error: ${error.message}`;
      setAlertMessage(errorMessage);
    }
  };
  

  return (
    <div>
      <h2>Create New User</h2>
      {alertMessage && <div className="alert">{alertMessage}</div>} {/* Show the alert message */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={user.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <select name="role" value={user.role} onChange={handleInputChange}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="manager">Manager</option>
          </select>
        </div>
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserPage;
