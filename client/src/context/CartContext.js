import React, { createContext, useState } from 'react';

// 1. Create the Context
const CartContext = createContext();

// 2. Create the "Provider" Component
// This component will wrap our app and provide the cart state
export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]); // This is our global state

  // 3. Add to Cart Function
  const addToCart = (product) => {
    // Check if the item is already in the cart
    const exist = cartItems.find((item) => item._id === product._id);

    if (exist) {
      // If it exists, just update the quantity
      setCartItems(
        cartItems.map((item) =>
          item._id === product._id ? { ...exist, qty: exist.qty + 1 } : item
        )
      );
    } else {
      // If it's a new item, add it to the cart with qty: 1
      
      // THIS IS THE LINE TO FIX:
      setCartItems([...cartItems, { ...product, qty: 1 }]);
    }
  };
  // We'll add a 'removeFromCart' function here later

  return (
    // 4. Provide the state and functions to all children
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

// 5. Export the context so we can use it in other components
export default CartContext;