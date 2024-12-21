// userController.js
const User = require('../moduls/UserShema'); // Import the User model
const bcrypt = require('bcrypt'); // For password hashing


// **Create User** - Declarative Approach
exports.createUser = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate required fields
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Name, email, and password are required.' });
  }

  try {
    // Hash the password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role: role || 'customer', // Default role is 'customer'
    });

    const savedUser = await newUser.save();
    res.status(201).json({
      message: 'User created successfully!',
      user: savedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// **Get All Users** - Declarative Approach
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password'); // Exclude password from the response
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// **Get User By ID** - Declarative Approach
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id).select('-password'); // Exclude password from the response
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// **Update User** - Imperative Approach
exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, role } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Imperative: Update fields one by one
    user.name = name || user.name;
    user.email = email || user.email;
    user.role = role || user.role;

    if (password) {
      user.password = await bcrypt.hash(password, 10); // Hash the new password
    }

    const updatedUser = await user.save();
    res.status(200).json({
      message: 'User updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
};

// **Delete User** - Imperative Approach
exports.deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }
    res.status(200).json({ message: 'User deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting user', error: error.message });
  }
};
