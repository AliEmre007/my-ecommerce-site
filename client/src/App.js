import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';

// --- COMPONENTS ---
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';

// --- SCREENS ---
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import OrderScreen from './screens/OrderScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserListScreen from './screens/UserListScreen'; 

function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Routes>
          {/* --- Public Routes --- */}
          <Route path="/" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/cart" element={<CartScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />

          {/* --- Protected Routes (Logged in Users) --- */}
          <Route element={<ProtectedRoute />}>
            <Route path="/shipping" element={<ShippingScreen />} />
            <Route path="/payment" element={<PaymentScreen />} />
            <Route path="/placeorder" element={<PlaceOrderScreen />} />
            <Route path="/order/:id" element={<OrderScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
          </Route>

          {/* --- Admin Routes (Admin Users Only) --- */}
          <Route element={<AdminRoute />}>
            <Route path="/admin/userlist" element={<UserListScreen />} />
          </Route>

        </Routes>
      </main>
    </div>
  );
}

export default App;