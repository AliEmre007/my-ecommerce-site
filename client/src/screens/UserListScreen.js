import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function UserListScreen() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // 1. Check if user is logged in AND is an admin
    if (userInfo && userInfo.isAdmin) {
      const fetchUsers = async () => {
        try {
          const res = await fetch('/api/users', {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          const data = await res.json();
          
          if (!res.ok) throw new Error(data.message);
          
          setUsers(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };

      fetchUsers();
    } else {
      // If not admin, kick them out
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <h1>Users</h1>
      {loading ? (
        <div>Loading users...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ADMIN</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>{user._id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  {user.isAdmin ? (
                    <span style={{ color: 'green' }}>✔</span>
                  ) : (
                    <span style={{ color: 'red' }}>✖</span>
                  )}
                </td>
                <td>
                  {/* We will add Edit/Delete buttons here later */}
                  <button>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default UserListScreen;