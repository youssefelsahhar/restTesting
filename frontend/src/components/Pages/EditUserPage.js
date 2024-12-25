import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditUserPage() {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: '', email: '', role: '' });

  useEffect(() => {
    axios
      .get(`http://localhost:4000/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
      });
  }, [userId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    axios
      .put(`http://localhost:4000/users/${userId}`, user)
      .then(() => {
        alert('User updated successfully!');
        navigate('/AdminDashboard');
      })
      .catch((error) => {
        console.error('Error updating user:', error);
        alert('Failed to update user.');
      });
  };

  return (
    <div>
      <h2>Edit User</h2>
      <form onSubmit={handleSaveChanges}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={user.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <label>Role:</label>
          <select
            name="role"
            value={user.role}
            onChange={handleInputChange}
            required
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/admin-dashboard')}>
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditUserPage;
