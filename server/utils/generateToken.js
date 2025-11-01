import jwt from 'jsonwebtoken';

// This function will take a user's ID and create a signed token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d', // The token will expire in 30 days
  });
};

export default generateToken;