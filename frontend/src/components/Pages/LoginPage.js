import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await axios.post('http://localhost:4000/users/login', {
        email,
        password,
      });

      setSuccess('Login successful!');
      console.log('User Data:', response.data);

      // Save token and role to localStorage
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('role', response.data.user.role);
      localStorage.setItem('id', response.data.user.id);


      // Check role and navigate
      const role = response.data.user.role;
      console.log('User role:', role);

      if (role === 'admin') {
        navigate('/AdminDashboard');  // Admin dashboard
      } else if (role === 'customer') {
        navigate('/UserDashboard');  // User dashboard
      } else {
        console.log('Invalid role');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Error logging in.');
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
    </div>
  );
};

export default LoginPage;
