import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function LoginScreen() {
  // 1. Form state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // 2. Loading and error state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // 3. Get global auth state and functions
  const { userInfo, login } = useContext(AuthContext);
  
  const navigate = useNavigate();

  // 4. Redirect if already logged in
  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to homepage if user is already logged in
    }
  }, [userInfo, navigate]);

  // 5. Handle form submission
  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 6. Call the backend login endpoint
      const res = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Invalid email or password');
      }

      // 7. On success, call the global 'login' function
      login(data);
      
      // 8. Redirect to the homepage
      navigate('/');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <h1>Sign In</h1>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <form onSubmit={submitHandler}>
        <div>
          <label>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit" disabled={loading}>
            {loading ? 'Signing In...' : 'Sign In'}
          </button>
        </div>
      </form>
      <div className="register-link">
        New Customer?{' '}
        <Link to="/register">Register here</Link>
      </div>
    </div>
  );
}

export default LoginScreen;