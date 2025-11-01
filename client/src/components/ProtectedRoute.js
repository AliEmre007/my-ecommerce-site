import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProtectedRoute() {
  const { userInfo } = useContext(AuthContext);

  // 'Outlet' is a placeholder for the component this route is protecting
  // (e.g., ShippingScreen, PaymentScreen)
  return userInfo ? <Outlet /> : <Navigate to='/login' replace />;
}

export default ProtectedRoute;