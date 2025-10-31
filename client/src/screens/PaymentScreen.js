import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import CartContext from '../context/CartContext';

function PaymentScreen() {
  const { paymentMethod, savePaymentMethod } = useContext(CartContext);
  
  // Initialize state with the value from context (or 'PayPal' as default)
  const [method, setMethod] = useState(paymentMethod || 'PayPal');

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    savePaymentMethod(method);
    // Navigate to the final "Place Order" screen (we'll build this next)
    navigate('/placeorder'); 
  };

  return (
    <div className="payment-container">
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <div>
          {/* We use radio buttons for payment options */}
          <input
            type="radio"
            id="paypal"
            name="paymentMethod"
            value="PayPal"
            checked={method === 'PayPal'} // Control the check
            onChange={(e) => setMethod(e.target.value)}
          />
          <label htmlFor="paypal">PayPal or Credit Card</label>
        </div>

        {/* We can add more payment options here later, e.g. "Stripe" */}
        
        <div>
          <button type="submit">Continue</button>
        </div>
      </form>
    </div>
  );
}

export default PaymentScreen;