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

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(cartItemsFromStorage);
  const [shippingAddress, setShippingAddress] = useState(shippingAddressFromStorage);
  
  // --- NEW ---
  const [paymentMethod, setPaymentMethod] = useState(paymentMethodFromStorage);
  // --- END NEW ---

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  // ... (your existing addToCart function) ...
  const addToCart = (product) => {
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

  // ... (your existing removeFromCart function) ...
  const removeFromCart = (id) => {
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // ... (your existing saveShippingAddress function) ...
  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };

  // --- NEW ---
  const savePaymentMethod = (data) => {
    setPaymentMethod(data);
    localStorage.setItem('paymentMethod', JSON.stringify(data));
  };
  // --- END NEW ---

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        shippingAddress,
        paymentMethod, // Provide the payment method
        addToCart, 
        removeFromCart,
        saveShippingAddress,
        savePaymentMethod // Provide the new function
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;