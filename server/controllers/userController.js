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

// We will add the 'loginUser' function here later

export { registerUser };