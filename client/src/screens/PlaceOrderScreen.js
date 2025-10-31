import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

function PlaceOrderScreen() {
  const { cartItems, shippingAddress, paymentMethod } = useContext(CartContext);
  const navigate = useNavigate();

  // --- Best Practice: Calculate Prices ---
  // We do this inside the component, not just in the JSX,
  // to keep the render logic clean.
  
  // Helper function to format prices
  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // 1. Items Price
  const itemsPrice = addDecimals(
    cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  );
  // 2. Shipping Price (Simple logic for now)
  const shippingPrice = addDecimals(itemsPrice > 100 ? 0 : 10);
  // 3. Tax Price (e.g., 15%)
  const taxPrice = addDecimals(Number((0.15 * itemsPrice).toFixed(2)));
  // 4. Total Price
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);
  // ------------------------------------

  const placeOrderHandler = () => {
    // This is where we will (in a future step) send all this data
    // to our backend API to create a new order.
    console.log('Placing order...');
    alert('Order placed! (Backend logic coming soon)');
    // We would also clear the cart here
    // navigate('/order/123'); // And redirect to the order details page
  };

  return (
    <div className="place-order-container">
      <h1>Place Order</h1>
      
      <div className="order-details">
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
          
          <button 
            type="button" 
            disabled={cartItems.length === 0}
            onClick={placeOrderHandler}
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;