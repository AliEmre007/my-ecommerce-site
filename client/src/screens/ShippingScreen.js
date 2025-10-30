import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// We will use our context later to save the address
// import { useContext } from 'react'; 
// import CartContext from '../context/CartContext';

function ShippingScreen() {
  // We'll pre-fill this from localStorage later
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [country, setCountry] = useState('');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    // 1. LATER: We will call a context function here to save the address
    console.log('Saving address:', { address, city, postalCode, country });
    // 2. Navigate to the next step (which we will build later)
    // navigate('/payment');
    alert('Address saved! (Payment page coming next)');
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