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

          {userInfo ? (
            <div className="user-menu">
              <span>Hello, {userInfo.name}</span>
              <Link to='/profile'>Profile</Link>
              
              {/* --- NEW ADMIN LINKS --- */}
              {userInfo.isAdmin && (
                <>
                  <Link to='/admin/userlist' style={{ marginLeft: '10px', color: 'orange' }}>
                    Users (Admin)
                  </Link>
                  <Link to='/admin/productlist' style={{ marginLeft: '10px', color: 'orange' }}>
                    Products
                  </Link>
                  <Link to='/admin/orderlist' style={{ marginLeft: '10px', color: 'orange' }}>
                    Orders
                  </Link>
                </>
              )}
              {/* --- END NEW LINKS --- */}
              
              <button onClick={logoutHandler}>Logout</button>
            </div>
          ) : (
            <Link to='/login'>Sign In</Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;