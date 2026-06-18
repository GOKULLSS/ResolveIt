import jwt from 'jsonwebtoken';
import User from '../models/User.js';

//generate jwt token
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET || 'fallback_secret_key_123',
    { expiresIn: '30d' }
  );
};

//registering of user
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    //check all fields filled
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: 'Please provide all fields (name, email, password, role)' });
    }

    //check role
    if (role !== 'Student' && role !== 'Admin') {
      return res.status(400).json({ message: 'Role must be either Student or Admin' });
    }

    //check user already exists
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    //create new user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
      role,
    });

    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id),
        });
    } else {
      return res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    console.error('Registration Error:', error.message);
    return res.status(500).json({ message: 'Server error. Registration failed.' });
  }
};

//login to existing user
export const loginUser = async (req, res) => {
    try {
    const { email, password } = req.body;

    //check field empty
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    //check for user exsisting
    const user = await User.findOne({ email: email.toLowerCase() });

    //validating i/p credentials
    if (user && (await user.matchPassword(password))) {
      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    console.error('Login Error:', error.message);
    return res.status(500).json({ message: 'Server error. Login failed.' });
  }
};

//access user data
export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-password');
    if (user) {
      return res.json(user);
    } else {
      return res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Get Profile Error:', error.message);
    return res.status(500).json({ message: 'Server error fetching user profile.' });
  }
};
