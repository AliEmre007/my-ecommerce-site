import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function AdminRoute() {
  const { userInfo } = useContext(AuthContext);

  // Check if user exists AND is an admin
  return userInfo && userInfo.isAdmin ? (
    <Outlet />
  ) : (
    <Navigate to='/login' replace />
  );
}

export default AdminRoute;