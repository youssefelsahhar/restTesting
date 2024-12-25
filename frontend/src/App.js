import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WelcomePage from './components/Pages/WelcomePage';
import LoginPage from './components/Pages/LoginPage';
import RegisterPage from './components/Pages/RegisterPage';
import UserDashboard from './components/Dashboards/UserDashboard';
import AdminDashboard from './components/Dashboards/AdminDashboard';
import UserForm from './components/User/UserForm';
import ViewCartPage from './components/Pages/ViewCartPage'; // Import the new ViewCartPage component
import EditUserPage from './components/Pages/EditUserPage'; // Adjust the path as needed to your folder structure
import EditProductPage from './components/Pages/EditProductPage';
import CreateProductPage from './components/Pages/CreateProductPage';
import CreateUserPage from './components/Pages/CreateUserPage';
import CartPage from './components/Pages/CartPage';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/UserDashboard" element={<UserDashboard />} />
        <Route path="/AdminDashboard" element={<AdminDashboard />} />
        <Route path="/user-form" element={<UserForm />} />
        <Route path="/edit-user/:userId" element={<EditUserPage />} />
        <Route path="/cart" element={<ViewCartPage />} />
        <Route path="/edit-product/:productId" element={<EditProductPage />} />
        <Route path="/create-product" element={<CreateProductPage />} />
        <Route path="/create-user" element={<CreateUserPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
    </Router>
  );
};

export default App;
