import React, { useContext, useState } from 'react'; // 1. Import useState
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

function PlaceOrderScreen() {
  const { 
    cartItems, 
    shippingAddress, 
    paymentMethod, 
    clearCart // 2. Get clearCart from context
  } = useContext(CartContext);
  
  const navigate = useNavigate();

  // 3. Add state for loading and errors
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // --- Price Calculations (same as before) ---
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

  // 4. --- THIS IS THE UPDATED HANDLER ---
  const placeOrderHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      // 5. Send the POST request to our server
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // 6. Send all our data in the 'body'
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
        // If server returns an error (like "No order items")
        throw new Error(data.message || 'Something went wrong');
      }

      // 7. On success:
      console.log('Order created:', data);
      clearCart(); // 8. Clear the cart from state & localStorage
      
      // 9. Redirect to the new order's details page
      navigate(`/order/${data._id}`);

    } catch (err) {
      setError(err.message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  // ------------------------------------

  return (
    <div className="place-order-container">
      <h1>Place Order</h1>
      
      {/* ... (All your existing JSX for shipping, payment, and items) ... */}
      
      <div className="order-total-column">
        <h2>Order Summary</h2>
        {/* ... (All your existing JSX for totals) ... */}

        {/* 10. Show error messages if any */}
        {error && <div style={{ color: 'red' }}>{error}</div>}
        
        <button 
          type="button" 
          disabled={cartItems.length === 0 || loading} // Disable if loading
          onClick={placeOrderHandler}
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
}

export default PlaceOrderScreen;