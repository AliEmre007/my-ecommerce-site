import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap'; // 1. Import Bootstrap components
import AuthContext from '../context/AuthContext';

function Header() {
  const { userInfo, logout } = useContext(AuthContext);

  const logoutHandler = () => {
    logout();
  };

  return (
    <header>
      {/* Dark theme navbar that collapses on mobile */}
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          {/* Brand Logo */}
          <Navbar.Brand as={Link} to="/">My E-commerce Site</Navbar.Brand>
          
          {/* Hamburger Toggle Button */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              
              <Nav.Link as={Link} to="/cart">
                Cart
              </Nav.Link>

              {userInfo ? (
                <NavDropdown title={userInfo.name} id="username">
                  <NavDropdown.Item as={Link} to="/profile">Profile</NavDropdown.Item>
                  <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Nav.Link as={Link} to="/login">
                  Sign In
                </Nav.Link>
              )}

              {/* Admin Menu */}
              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin" id="adminmenu">
                  <NavDropdown.Item as={Link} to="/admin/userlist">Users</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/productlist">Products</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/admin/orderlist">Orders</NavDropdown.Item>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;