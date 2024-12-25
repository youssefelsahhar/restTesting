import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const WelcomePage = () => {
  const navigate = useNavigate(); // Create navigate function

  const handleLogin = () => {
    navigate('/login'); // Navigate to the login page
  };

  const handleRegister = () => {
    navigate('/register'); // Navigate to the register page
  };

  return (
    <div>
      <h1>Welcome to Our Platform</h1>
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default WelcomePage;
