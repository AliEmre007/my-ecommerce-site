import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';

const protect = async (req, res, next) => {
  let token;

  // 1. Read the token from the 'Authorization' header
  // It's usually sent as 'Bearer <token>'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Get just the token string
      token = req.headers.authorization.split(' ')[1];

      // 3. Verify the token using your JWT_SECRET
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Find the user from the token's ID and attach them to the request
      // We exclude the password
      req.user = await User.findById(decoded.id).select('-password');

      next(); // Move on to the next step (the controller)
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// We'll add an 'admin' middleware here later
export { protect };