import React, { useState } from 'react';
import axios from 'axios';

const RegisterPage = () => {
  // State variables
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleRegister = async (event) => {
    event.preventDefault();

    // Basic form validation
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    // Reset error and success messages
    setError('');
    setSuccessMessage('');
    setLoading(true);

    try {
      // Make a POST request to your backend API to create the user
      const response = await axios.post('http://localhost:4000/users/create', {
        name,
        email,
        password,
      });

      // If registration is successful
      if (response.data && response.data.message === 'User created successfully!') {
        setSuccessMessage('Registration successful! You can now log in.');
        setName('');
        setEmail('');
        setPassword('');
      } else {
        setError('Unexpected response from the server.');
      }
    } catch (err) {
      // Handle errors (network or backend issues)
      if (err.response && err.response.data) {
        setError(err.response.data.message); // Backend error message
      } else {
        setError('An error occurred during registration. Please try again.');
      }
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>

      {/* Display success message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Display error message */}
      {error && <div className="error-message">{error}</div>}

      <form onSubmit={handleRegister}>
        {/* Name input */}
        <div className="form-group">
          <label htmlFor="name">Full Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
          />
        </div>

        {/* Email input */}
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        </div>

        {/* Password input */}
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
          />
        </div>

        {/* Submit button */}
        <button type="submit" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
