import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

function PlaceOrderScreen() {
  const {
    cartItems,
    shippingAddress,
    paymentMethod,
    clearCart,
  } = useContext(CartContext);
  
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Price Calculations ---
  const addDecimals = (num) => (Math.round(num * 100) / 100).toFixed(2);
  
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  // ------------------------------------

  const placeOrderHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderItems: cartItems,
          shippingAddress: shippingAddress,
          paymentMethod: paymentMethod,
          itemsPrice: itemsPrice,
          shippingPrice: shippingPrice,
          taxPrice: taxPrice,
          totalPrice: totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'Something went wrong');
      }

      console.log('Order created:', data);
      clearCart();
      navigate(`/order/${data._id}`);

    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="place-order-container">
      <h1>Place Order</h1>
      
      <div className="order-details">
        {/* --- THIS IS THE COLUMN YOU ARE MISSING --- */}
        <div className="order-summary-column">
          {/* --- Shipping --- */}
          <h2>Shipping</h2>
          <p>
            <strong>Address: </strong>
            {shippingAddress.address}, {shippingAddress.city},{' '}
            {shippingAddress.postalCode}, {shippingAddress.country}
          </p>

          {/* --- Payment --- */}
          <h2>Payment Method</h2>
          <p>
            <strong>Method: </strong>
            {paymentMethod}
          </p>

          {/* --- Order Items --- */}
          <h2>Order Items</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <div className="cart-items">
              {cartItems.map((item) => (
                <div key={item._id} className="cart-item-summary">
                  <span className="cart-item-name">
                    <Link to={`/product/${item._id}`}>{item.name}</Link>
                  </span>
                  <span>
                    {item.qty} x ${item.price} = ${addDecimals(item.qty * item.price)}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
        {/* --- END MISSING COLUMN --- */}


        <div className="order-total-column">
          {/* --- Order Total --- */}
          <h2>Order Summary</h2>
          <div className="total-row">
            <span>Items:</span>
            <span>${itemsPrice}</span>
          </div>
          <div className="total-row">
            <span>Shipping:</span>
            <span>${shippingPrice}</span>
          </div>
          <div className="total-row">
            <span>Tax:</span>
            <span>${taxPrice}</span>
          </div>
          <div className="total-row total-price">
            <span>Total:</span>
            <span>${totalPrice}</span>
          </div>
          
          {error && <div style={{ color: 'red' }}>{error}</div>}

          <button 
            type="button" 
            disabled={cartItems.length === 0 || loading}
            onClick={placeOrderHandler}
          >
            {loading ? 'Placing Order...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;