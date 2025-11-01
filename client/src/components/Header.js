import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext'; // 1. Import context

function Header() {
  // 2. Get auth state and functions
  const { userInfo, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout(); // Call the logout function from context
  };

  return (
    <header>
      <nav>
        <Link to='/'>My E-commerce Site</Link>
        <div>
          <Link to='/cart'>Cart</Link>

          {/* 3. Add conditional logic */}
          {userInfo ? (
            // If user is logged in:
            <div className="user-menu">
              <span>Hello, {userInfo.name}</span>
              <Link to='/profile'>Profile</Link>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          ) : (
            // If user is not logged in:
            <Link to='/login'>Sign In</Link>
          )}

        </div>
      </nav>
    </header>
  );
}

export default Header;