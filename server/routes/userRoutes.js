import express from 'express';
const router = express.Router();
import { registerUser } from '../controllers/userController.js';

// When a POST request comes to /api/users/register
// use the registerUser controller
router.route('/register').post(registerUser);

// We will add the '/login' route here later

export default router;