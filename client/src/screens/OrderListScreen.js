import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function OrderListScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userInfo } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      const fetchOrders = async () => {
        try {
          const res = await fetch('/api/orders', {
            headers: {
              Authorization: `Bearer ${userInfo.token}`,
            },
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.message);
          
          setOrders(data);
          setLoading(false);
        } catch (err) {
          setError(err.message);
          setLoading(false);
        }
      };
      fetchOrders();
    } else {
      navigate('/login');
    }
  }, [userInfo, navigate]);

  return (
    <div>
      <h1>Orders</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div style={{ color: 'red' }}>{error}</div>
      ) : (
        <table className="orders-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    <span style={{ color: 'green' }}>
                      {new Date(order.paidAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span style={{ color: 'red' }}>✖</span>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    <span style={{ color: 'green' }}>
                      {new Date(order.deliveredAt).toLocaleDateString()}
                    </span>
                  ) : (
                    <span style={{ color: 'red' }}>✖</span>
                  )}
                </td>
                <td>
                  <Link to={`/order/${order._id}`}>
                    <button>Details</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default OrderListScreen;