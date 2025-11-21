import React, { useEffect, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';

// --- 1. Import Stripe libraries ---
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm'; 
import AuthContext from '../context/AuthContext';

// --- Helper function to format prices ---
const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

function OrderScreen() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // --- 2. Add state for Stripe ---
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState(null);
  
  const { userInfo } = useContext(AuthContext);
  const { id: orderId } = useParams();

  useEffect(() => {
    const fetchOrderAndStripeConfig = async () => {
      try {
        setLoading(true);

        // 1. Fetch the order
        const orderRes = await fetch(`/api/orders/${orderId}`, {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        });

        if (!orderRes.ok) {
          const errorData = await orderRes.json();
          throw new Error(errorData.message || 'Could not fetch order');
        }
        const orderData = await orderRes.json();
        setOrder(orderData);

        // 2. If order is NOT paid, fetch Stripe config
        if (!orderData.isPaid) {
          const configRes = await fetch('/api/config/stripe');
          const { publishableKey } = await configRes.json();
          setStripePromise(loadStripe(publishableKey));

          const intentRes = await fetch(`/api/orders/${orderId}/create-payment-intent`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          if (!intentRes.ok) {
            const errorData = await intentRes.json();
            throw new Error(errorData.message || 'Could not create payment intent');
          }
          const { client_secret } = await intentRes.json();
          setClientSecret(client_secret);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderAndStripeConfig();
  }, [orderId, userInfo]);

  // --- 3. NEW: Deliver Handler Function ---
  const deliverHandler = async () => {
    try {
      const res = await fetch(`/api/orders/${orderId}/deliver`, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      if (!res.ok) throw new Error('Failed to mark as delivered');
      
      // Reload to see the green "Delivered" status
      window.location.reload();
    } catch (err) {
      alert(err.message);
    }
  };
  // --- END NEW ---

  const options = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!order) return <div>Order not found.</div>;

  return (
    <div className="place-order-container">
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      
      <div className="order-details">
        <div className="order-summary-column">
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          {order.isDelivered ? (
            <div style={{ color: 'green', fontWeight: 'bold' }}>Delivered on {new Date(order.deliveredAt).toLocaleDateString()}</div>
          ) : (
            <div style={{ color: 'red', fontWeight: 'bold' }}>Not Delivered</div>
          )}

          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {order.paymentMethod}
          </p>
          {order.isPaid ? (
            <div style={{ color: 'green', fontWeight: 'bold' }}>Paid on {new Date(order.paidAt).toLocaleString()}</div>
          ) : (
            <div style={{ color: 'red', fontWeight: 'bold' }}>Not Paid</div>
          )}

          <h2>Order Items</h2>
          <div className="cart-items">
            {order.orderItems.map((item) => (
              <div key={item._id} className="cart-item-summary">
                <span className="cart-item-name">
                  <Link to={`/product/${item.product}`}>{item.name}</Link>
                </span>
                <span>
                  {item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="order-total-column">
          <h2>Order Summary</h2>
          <div className="total-row"><span>Items:</span><span>${order.itemsPrice}</span></div>
          <div className="total-row"><span>Shipping:</span><span>${order.shippingPrice}</span></div>
          <div className="total-row"><span>Tax:</span><span>${order.taxPrice}</span></div>
          <div className="total-row total-price"><span>Total:</span><span>${order.totalPrice}</span></div>
          
          {/* Payment Form (Only if not paid) */}
          {!order.isPaid && stripePromise && clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm orderId={order._id} totalPrice={order.totalPrice} />
            </Elements>
          )}

          {/* --- 4. NEW: Admin Mark As Delivered Button --- */}
          {/* Show ONLY if User is Admin, Order is Paid, and Not Delivered */}
          {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
            <button 
              type="button" 
              className="btn btn-block" 
              onClick={deliverHandler}
              style={{ marginTop: '10px', width: '100%', backgroundColor: '#333', color: 'white', padding: '10px', cursor: 'pointer' }}
            >
              Mark As Delivered
            </button>
          )}
          {/* --- END NEW --- */}

        </div>
      </div>
    </div>
  );
}

export default OrderScreen;