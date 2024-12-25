import React, { useState } from 'react';
import axios from 'axios';

const UserForm = ({ onAlert }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default 'user' role

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation (ensure all fields are filled)
    if (!name || !email || !password) {
      onAlert('Please fill out all fields.');
      return;
    }

    try {
      // Sending the data to your backend
      const response = await axios.post('http://localhost:4000/users/create', {
        name,
        email,
        password,
        role,
      });

      if (response.status === 201) {
        onAlert('User created successfully!');
        // You can redirect the user here, if needed
      }
    } catch (error) {
      // Handle error, display a message
      console.error('Error creating user:', error);
      onAlert('Failed to create user: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <button type="submit">Create User</button>
    </form>
  );
};

export default UserForm;
