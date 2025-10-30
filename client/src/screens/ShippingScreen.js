import React, { useState, useContext } from 'react'; // 1. Import useContext
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext'; // 2. Import our context

function ShippingScreen() {
  // 3. Get context data
  const { shippingAddress, saveShippingAddress } = useContext(CartContext);

  // 4. Pre-fill state from context (or with an empty string)
  const [address, setAddress] = useState(shippingAddress.address || '');
  const [city, setCity] = useState(shippingAddress.city || '');
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
  const [country, setCountry] = useState(shippingAddress.country || '');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // 5. Call context function to save the address
    saveShippingAddress({ address, city, postalCode, country });
    
    // 6. Navigate to the next step
    navigate('/payment');
  };

  return (
    <div className="shipping-container">
      <h1>Shipping Address</h1>
      <form onSubmit={submitHandler}>
        <div>
          <label>Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Postal Code</label>
          <input
            type="text"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Country</label>
          <input
            type="text"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default ShippingScreen;