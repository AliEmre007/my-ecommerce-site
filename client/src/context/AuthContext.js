import React, { createContext, useState, useEffect } from 'react';

// 1. Get initial 'userInfo' from localStorage
const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null; // Start with 'null' if not logged in

// 2. Create the Context
const AuthContext = createContext();

// 3. Create the Provider Component
export function AuthProvider({ children }) {
  const [userInfo, setUserInfo] = useState(userInfoFromStorage);

  // 4. Watch for changes in 'userInfo' and update localStorage
  useEffect(() => {
    if (userInfo) {
      localStorage.setItem('userInfo', JSON.stringify(userInfo));
    } else {
      localStorage.removeItem('userInfo');
    }
  }, [userInfo]);

  // 5. Login function (to be called from LoginScreen)
  const login = (userData) => {
    setUserInfo(userData);
  };

  // 6. Logout function
  const logout = () => {
    setUserInfo(null);
    // We'll also clear cart/shipping data later
    document.location.href = '/login'; // Redirect to login
  };

  return (
    // 7. Provide the state and functions to all children
    <AuthContext.Provider value={{ userInfo, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContext;