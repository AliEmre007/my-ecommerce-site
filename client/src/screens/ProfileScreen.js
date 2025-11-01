import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProfileScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false); // To show a success message

  const { userInfo, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 1. Fetch user data on component load
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const fetchUserProfile = async () => {
        setLoading(true);
        try {
          const res = await fetch('/api/users/profile', {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.message || 'Failed to fetch profile');
          }
          // 2. Fill the form with the user's data
          setName(data.name);
          setEmail(data.email);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
      fetchUserProfile();
    }
  }, [userInfo, navigate]);

  // 3. Handle form submission (we'll build the backend for this next)
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    
    setError(null);
    setSuccess(false);
    setLoading(true);
    
    // In our next step, we will create the PUT /api/users/profile endpoint
    alert('Update logic is the next step!');
    setLoading(false);
    
    /*
    // --- THIS IS WHAT WE WILL ADD NEXT ---
    try {
      const res = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${userInfo.token}`,
        },
        body: JSON.stringify({ name, email, password }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      
      // Update the global state and localStorage
      login(data);
      setSuccess(true);
      setPassword('');
      setConfirmPassword('');

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
    */
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2>User Profile</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>Profile Updated!</div>}
        <form onSubmit={submitHandler}>
          <div>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label>New Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Leave blank to keep the same"
            />
          </div>
          <div>
            <label>Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div>
            <button type="submit" disabled={loading}>
              {loading ? 'Updating...' : 'Update Profile'}
            </button>
          </div>
        </form>
      </div>
      <div className="profile-orders">
        <h2>My Orders</h2>
        {/* We will build this section next */}
      </div>
    </div>
  );
}

export default ProfileScreen;