import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

function OrderScreen() {
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { id: orderId } = useParams();

  useEffect(() => {
    // 1. Fetch the specific order from the backend
    const fetchOrder = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/orders/${orderId}`);
        
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || 'Could not fetch order');
        }
        
        const data = await res.json();
        setOrder(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]); // Re-run if the orderId in the URL changes

  // Helper function to format prices
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);

  // 2. Show loading or error messages
  if (loading) {
    return <div>Loading...</div>;
  }
  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>;
  }
  if (!order) {
    return <div>Order not found.</div>;
  }

  // 3. Display the full order details
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
          {/* We'll add a 'Delivered' status here later */}

          {/* --- Payment --- */}
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {order.paymentMethod}
          </p>
          {/* We'll add a 'Paid' status here later */}

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
          <div className="total-row">
            <span>Items:</span>
            <span>${order.itemsPrice}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>${order.shippingPrice}</span>
          </div>
          <div className="total-row">
            <span>Tax:</span>
            <span>${order.taxPrice}</span>
          </div>
          <div className="total-row total-price">
            <span>Total:</span>
            <span>${order.totalPrice}</span>
          </div>
          
          {/* We will add the PayPal payment button here */}
        </div>
      </div>
    </div>
  );
}

export default OrderScreen;