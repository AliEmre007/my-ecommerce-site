import React, { createContext, useState, useEffect } from 'react';

// Get data from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

// --- NEW ---
const paymentMethodFromStorage = localStorage.getItem('paymentMethod')
  ? JSON.parse(localStorage.getItem('paymentMethod'))
  : ''; // Payment method is just a string
// --- END NEW ---

const CartContext = createContext();

// client/src/context/CartContext.js

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(cartItemsFromStorage);
  const [shippingAddress, setShippingAddress] = useState(shippingAddressFromStorage);
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromStorage);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // ... (your existing addToCart logic)
    const exist = cartItems.find((item) => item._id === product._id);
    if (exist) {
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    // ... (your existing removeFromCart logic)
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  const saveShippingAddress = (data) => {
    // ... (your existing saveShippingAddress logic)
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  const savePaymentMethod = (data) => {
    // ... (your existing savePaymentMethod logic)
    setPaymentMethod(data);
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };

  // --- ADD THIS FUNCTION ---
  const clearCart = () => {
    setCartItems([]); // Just set the cart to an empty array
  };
  // --- END ADD ---

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        shippingAddress,
        paymentMethod,
        addToCart, 
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod,
        clearCart // <-- AND ADD THIS
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;