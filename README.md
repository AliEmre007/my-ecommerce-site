# 🛒 MERN Stack E-Commerce Platform

> A full-stack e-commerce application built from scratch with MongoDB, Express, React, and Node.js.

[![Live Demo](https://img.shields.io/badge/demo-online-green.svg)](https://my-ecommerce-site-wy1j.onrender.com)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📄 Description

This project is a fully functional e-commerce platform that simulates a real-world shopping experience. It features a complete product catalog, a persistent shopping cart, secure user authentication, and a full checkout process integrated with Stripe payments.

It also includes a comprehensive Admin Dashboard for managing products, users, and order fulfillment status.

## 🚀 Features

### User Features
- **Product Browsing:** View all products and product details.
- **Shopping Cart:** Add/remove items, adjust quantities, persistent storage.
- **Checkout Process:** Shipping address, payment method selection, order summary.
- **Secure Payments:** Integrated Stripe credit card processing.
- **User Accounts:** Registration, login (JWT), and profile management.
- **Order History:** View past orders and their delivery status.

### Admin Features
- **Product Management:** Create, edit, and delete products.
- **User Management:** View all users and admin status.
- **Order Management:** View all orders and mark them as "Delivered."

## 🛠️ Tech Stack

- **Frontend:** React.js, React Router, React-Bootstrap, Context API (State Management).
- **Backend:** Node.js, Express.js.
- **Database:** MongoDB, Mongoose.
- **Authentication:** JSON Web Tokens (JWT), BCrypt.
- **Payment Gateway:** Stripe.
- **Deployment:** Render.

## ⚙️ Environment Variables

To run this project locally, you will need to add the following environment variables to your `.env` file in the `server` folder:

```env
NODE_ENV = development
PORT = 5000
MONGO_URI = your_mongodb_connection_string
JWT_SECRET = your_jwt_secret
STRIPE_PUBLISHABLE_KEY = your_stripe_publishable_key
STRIPE_SECRET_KEY = your_stripe_secret_key

## 📦 Installation & Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/AliEmre007/my-ecommerce-site.git
   cd my-ecommerce-site

2.Install Dependencies (Root, Client, & Server)
    npm install
    cd client
    npm install
    cd ..

3.Run the App

# Run frontend and backend concurrently
npm start

Access the App Open http://localhost:3000 to view it in the browser.

🧪 Test Accounts
You can use these credentials to test the demo (or create your own):

Admin User: admin@example.com / 123456 (Requires isAdmin: true in DB)

Regular User: user@example.com / 123456

💳 Test Credit Card (Stripe)To test the payment flow in development mode, use the standard Stripe test card:
Card Number         Expiry     CVC
4242 4242 4242 4242 Any Future Date123

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.


---

