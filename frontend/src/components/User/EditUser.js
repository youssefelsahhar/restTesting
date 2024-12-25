import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function EditUser() {
  const [user, setUser] = useState({ name: '', email: '', role: '' });
  const { userId } = useParams(); // Get userId from the URL
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user details when the page loads
    axios
      .get(`http://localhost:4000/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user:', error);
      });
  }, [userId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:4000/users/${userId}`, user)
      .then(() => {
        alert('User updated successfully');
        navigate('/admin-dashboard'); // Redirect to the admin dashboard
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Role</label>
          <input
            type="text"
            name="role"
            value={user.role}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Update User</button>
      </form>
    </div>
  );
}

export default EditUser;
