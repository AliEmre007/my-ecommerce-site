import React from 'react';
import { useParams } from 'react-router-dom';

function OrderScreen() {
  const { id: orderId } = useParams();

  return (
    <div>
      <h1>Thank you for your order!</h1>
      <p>Your Order ID is: {orderId}</p>
      <p>We will build this page out next.</p>
    </div>
  );
}

export default OrderScreen;