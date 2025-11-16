import User from '../models/userModel.js';
import generateToken from '../utils/generateToken.js';

/**
 * @desc    Register a new user
 * @route   POST /api/users/register
 * @access  Public
 */
const registerUser = async (req, res) => {
  try {
    // 1. Get user data from the request body
    const { name, email, password } = req.body;

    // 2. Check if the user (email) already exists
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: 'User already exists' });
      return;
    }

    // 3. If no user, create a new one in memory
    // (The password will be hashed automatically by our 'pre-save' hook)
    const user = await User.create({
      name,
      email,
      password,
    });

    // 4. If user was created successfully...
    if (user) {
      // 5. Send back the user's data (but not the password)
      //    and the new token
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      res.status(4.00).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(5.00).json({ message: `Error registering user: ${error.message}` });
  }
};

/**
 * @desc    Auth user & get token (Login)
 * @route   POST /api/users/login
 * @access  Public
 */
const loginUser = async (req, res) => {
  try {
    // 1. Get email and password from the request body
    const { email, password } = req.body;

    // 2. Find the user in the database by their email
    const user = await User.findOne({ email });

    // 3. Check if user exists AND if the password matches
    if (user && (await user.matchPassword(password))) {
      // 4. If both are true, send back user data and a new token
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
      });
    } else {
      // 5. If user not found or password doesn't match
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error logging in: ${error.message}` });
  }
};

/**
 * @desc    Get user profile
 * @route   GET /api/users/profile
 * @access  Private
 */
const getUserProfile = async (req, res) => {
  try {
    // The 'protect' middleware already found the user and attached it to req.user
    const user = req.user; 

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error getting profile: ${error.message}` });
  }
};

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
const updateUserProfile = async (req, res) => {
  try {
    // The 'protect' middleware already gives us the user
    const user = await User.findById(req.user._id);

    if (user) {
      // 1. Update the fields
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;

      // 2. Only update the password if a new one was sent
      if (req.body.password) {
        user.password = req.body.password;
        // The 'pre-save' hook in userModel.js will hash this
      }

      // 3. Save the updated user
      const updatedUser = await user.save();

      // 4. Send back the new data and a new token
      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: `Error updating profile: ${error.message}` });
  }
};
export { registerUser, loginUser, getUserProfile, updateUserProfile };
