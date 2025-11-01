import React, { useState } from 'react';
import {
  PaymentElement,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';
import './CheckoutForm.css'; // We'll create this file next

// This 'orderId' and 'totalPrice' will be passed in from OrderScreen
export default function CheckoutForm({ orderId, totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      return;
    }

    setIsLoading(true);

    // 1. Confirm the payment with Stripe
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // We redirect back to this page after payment
        return_url: `${window.location.origin}/order/${orderId}`,
      },
      // We set redirect: 'if_required' so we can handle the 
      // success in this function instead of an immediate redirect.
      redirect: 'if_required', 
    });

    // 2. Handle errors
    if (error) {
      if (error.type === 'card_error' || error.type === 'validation_error') {
        setMessage(error.message);
      } else {
        setMessage('An unexpected error occurred.');
      }
      setIsLoading(false);
      return;
    }

    // 3. If no error, paymentIntent is populated. Check its status.
    if (paymentIntent && paymentIntent.status === 'succeeded') {
      // 4. Payment was a success! Now, update our *own* backend.
      try {
        const res = await fetch(`/api/orders/${orderId}/pay`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            id: paymentIntent.id,
            status: paymentIntent.status,
            update_time: paymentIntent.created,
            receipt_email: paymentIntent.receipt_email,
          }),
        });

        if (!res.ok) {
          throw new Error('Failed to update order status.');
        }

        // 5. Reload the page to show the "Paid" status.
        // We are already at the correct URL.
        window.location.reload();

      } catch (err) {
        setMessage(`Error updating order: ${err.message}`);
      }
    }

    setIsLoading(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <PaymentElement id="payment-element" />
      <button disabled={isLoading || !stripe || !elements} id="submit">
        <span id="button-text">
          {isLoading ? <div className="spinner" id="spinner"></div> : `Pay $${totalPrice}`}
        </span>
      </button>
      {/* Show any error or success messages */}
      {message && <div id="payment-message">{message}</div>}
    </form>
  );
}