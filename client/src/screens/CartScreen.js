import React, { useContext } from 'react';
// 1. Import useNavigate in addition to Link
import { Link, useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

function CartScreen() {
  // 2. Get removeFromCart from context (from our previous localStorage step)
  const { cartItems, removeFromCart } = useContext(CartContext);
  
  // 3. Initialize the navigate function
  const navigate = useNavigate();

  // 4. Create the handler function for checkout
  const checkoutHandler = () => {
    navigate('/shipping');
  };

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div>
          Your cart is empty. <Link to="/">Go Shopping</Link>
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <div className="cart-item-name">
                <Link to={`/product/${item._id}`}>{item.name}</Link>
              </div>
              <div className="cart-item-price">${item.price}</div>
              <div className="cart-item-qty">
                Qty: {item.qty}
              </div>
              <div className="cart-item-remove">
                {/* 5. Add onClick for removing an item */}
                <button onClick={() => removeFromCart(item._id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="cart-subtotal">
          <h2>
            Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)} items)
          </h2>
          <p>
            ${cartItems.reduce((acc, item) => acc + item.qty * item.price, 0).toFixed(2)}
          </p>
          {/* 6. Add onClick for proceeding to checkout */}
          <button onClick={checkoutHandler}>
            Proceed to Checkout
          </button>
        </div>
      )}
    </div>
  );
}

export default CartScreen;