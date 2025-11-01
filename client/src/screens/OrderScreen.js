import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

// --- 1. Import Stripe libraries ---
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../components/CheckoutForm'; // Import your new form
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

        // --- FIX 1: Better Error Handling ---
        // We check for NOT ok, and read the server's message
        if (!orderRes.ok) {
          const errorData = await orderRes.json();
          throw new Error(errorData.message || 'Could not fetch order');
        }
        const orderData = await orderRes.json();
        setOrder(orderData);

        // 2. If order is NOT paid, fetch Stripe config
        if (!orderData.isPaid) {
          // Fetch Publishable Key
          const configRes = await fetch('/api/config/stripe');
          const { publishableKey } = await configRes.json();
          setStripePromise(loadStripe(publishableKey));

          // Create Payment Intent to get Client Secret
          const intentRes = await fetch(`/api/orders/${orderId}/create-payment-intent`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${userInfo.token}` },
          });
          if (!intentRes.ok) {
             // Also add better error handling here
            const errorData = await intentRes.json();
            throw new Error(errorData.message || 'Could not create payment intent');
          }
          // We need to read the JSON from the successful response
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
  }, [orderId, userInfo]); // Re-run if the orderId in the URL changes

  // 3. Set Stripe Elements options
  const options = {
    clientSecret,
    appearance: { theme: 'stripe' },
  };

  // 4. Show loading/error messages
  if (loading) return <div>Loading...</div>;
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;
  if (!order) return <div>Order not found.</div>;

  // 5. Display the full order details
  return (
    <div className="place-order-container">
      <h1>Order Details</h1>
      <p><strong>Order ID:</strong> {order._id}</p>
      
      <div className="order-details">
        <div className="order-summary-column">
          {/* --- Shipping --- */}
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {order.shippingAddress.address}, {order.shippingAddress.city},{' '}
            {order.shippingAddress.postalCode}, {order.shippingAddress.country}
          </p>
          {/* --- Show a 'Delivered' status --- */}
          {order.isDelivered ? (
            <div style={{ color: 'green', fontWeight: 'bold' }}>Delivered on {order.deliveredAt}</div>
          ) : (
            <div style={{ color: 'red', fontWeight: 'bold' }}>Not Delivered</div>
          )}

          {/* --- Payment --- */}
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {order.paymentMethod}
          </p>
          {/* --- Show a 'Paid' status --- */}
          {order.isPaid ? (
            <div style={{ color: 'green', fontWeight: 'bold' }}>Paid on {new Date(order.paidAt).toLocaleString()}</div>
          ) : (
            <div style={{ color: 'red', fontWeight: 'bold' }}>Not Paid</div>
          )}

          {/* --- Order Items --- */}
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
          {/* --- Order Total --- */}
          <h2>Order Summary</h2>
          <div className="total-row"><span>Items:</span><span>${order.itemsPrice}</span></div>
          <div className="total-row"><span>Shipping:</span><span>${order.shippingPrice}</span></div>
          <div className="total-row"><span>Tax:</span><span>${order.taxPrice}</span></div>
          <div className="total-row total-price"><span>Total:</span><span>${order.totalPrice}</span></div>
          
          {/* --- 6. CONDITIONAL PAYMENT BLOCK --- */}
          {/* If the order is not paid, AND stripe is ready, show the form */}
          {!order.isPaid && stripePromise && clientSecret && (
            <Elements options={options} stripe={stripePromise}>
              <CheckoutForm orderId={order._id} totalPrice={order.totalPrice} />
            </Elements>
          )}
          {/* --- END PAYMENT BLOCK --- */}

        </div>
      </div>
    </div>
  );
}

export default OrderScreen;