import React, { useState, useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function ProfileScreen() {
  // --- Profile Form State ---
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // --- Order List State ---
  const [orders, setOrders] = useState([]); // <-- 1. ADD NEW STATE

  // --- Page Status State ---
  const [loading, setLoading] = useState(true); // Changed to true to cover initial load
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(true); // <-- 2. ADD NEW STATE

  const { userInfo, login } = useContext(AuthContext);
  const navigate = useNavigate();

  // 3. Update useEffect to fetch profile AND orders
  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      const fetchUserProfile = async () => {
        try {
          const res = await fetch('/api/users/profile', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Failed to fetch profile');
          setName(data.name);
          setEmail(data.email);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false); // Stop main loading
        }
      };

      // --- 4. ADD NEW FUNCTION TO FETCH ORDERS ---
      const fetchUserOrders = async () => {
        try {
          const res = await fetch('/api/orders/myorders', {
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message || 'Failed to fetch orders');
          setOrders(data);
        } catch (err) {
          setError(err.message); // Can use the same error state
        } finally {
          setLoadingOrders(false);
        }
      };
      // --- END NEW FUNCTION ---

      fetchUserProfile();
      fetchUserOrders(); // <-- 5. CALL THE NEW FUNCTION
    }
  }, [userInfo, navigate]);

  // Profile update submit handler (no changes needed)
  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    // ... (rest of your existing submitHandler)
    setError(null);
    setSuccess(false);
    setLoading(true);
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
      login(data);
      setSuccess(true);
      setPassword('');
      setConfirmPassword('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-form">
        <h2>User Profile</h2>
        {error && <div style={{ color: 'red' }}>{error}</div>}
        {success && <div style={{ color: 'green' }}>Profile Updated!</div>}
        {loading ? (
          <div>Loading Profile...</div>
        ) : (
          <form onSubmit={submitHandler}>
            {/* ... (your existing form inputs for name, email, password) ... */}
             <div>
              <label>Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
            </div>
            <div>
              <label>Email Address</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <label>New Password</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Leave blank to keep the same" />
            </div>
            <div>
              <label>Confirm New Password</label>
              <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </div>
            <div>
              <button type="submit" disabled={loading}>
                {loading ? 'Updating...' : 'Update Profile'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* --- 6. ADD JSX FOR "MY ORDERS" --- */}
      <div className="profile-orders">
        <h2>My Orders</h2>
        {loadingOrders ? (
          <div>Loading Orders...</div>
        ) : error ? (
          <div style={{ color: 'red' }}>{error}</div>
        ) : (
          <table className="orders-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>DATE</th>
                <th>TOTAL</th>
                <th>PAID</th>
                <th>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                  <td>${order.totalPrice}</td>
                  <td>{order.isPaid ? 'Yes' : 'No'}</td>
                  <td>{order.isDelivered ? 'Yes' : 'No'}</td>
                  <td>
                    <Link to={`/order/${order._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      {/* --- END "MY ORDERS" --- */}
    </div>
  );
}

export default ProfileScreen;