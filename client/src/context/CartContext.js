import React, { createContext, useState, useEffect } from 'react';

// Get cart items from localStorage
const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

// --- NEW ---
// Get shipping address from localStorage
const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {}; // Start with an empty object if it doesn't exist
// --- END NEW ---

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(cartItemsFromStorage);
  
  // --- NEW ---
  const [shippingAddress, setShippingAddress] = useState(shippingAddressFromStorage);
  // --- END NEW ---

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // ... (your existing addToCart function - no changes needed)
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
    setCartItems(cartItems.filter((item) => item._id !== id));
  };

  // --- NEW ---
  // A new function to save the address to state and localStorage
  const saveShippingAddress = (data) => {
    setShippingAddress(data);
    localStorage.setItem('shippingAddress', JSON.stringify(data));
  };
  // --- END NEW ---

  return (
    <CartContext.Provider 
      value={{ 
        cartItems, 
        shippingAddress, // Provide the address to the app
        addToCart, 
        removeFromCart,
        saveShippingAddress // Provide the new function
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartContext;