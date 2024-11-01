import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useWebStore from '../../store/web-store';
import { payment } from "../../api/stripe";
import CheckoutForm from "../../components/CheckoutForm";

const stripePromise = loadStripe("pk_test_51QE62SB3qV93AT6MF5RouLqMNIHV9TxNoQmDq3grKl6M4vBiXWKXTtGmMyItnpmddzm1aiW3PUYthqSb9J4baX5w00ymN4EhMX");

const Checkout = () => {
  const token = useWebStore((s) => s.token);
  const [clientSecret, setClientSecret] = useState("");
  const [paymentError, setPaymentError] = useState(null);

  useEffect(() => {
    payment(token)
      .then((res) => {
        if (res.data && res.data.clientSecret) {
          setClientSecret(res.data.clientSecret);
        } else {
          setPaymentError("Failed to load payment data.");
        }
      })
      .catch((err) => {
        console.error(err);
        setPaymentError("Error initializing payment. Please try again.");
      });
  }, [token]);

  const appearance = { theme: 'stripe' };
  const loader = 'auto';

  if (paymentError) {
    return <div className="text-red-500">{paymentError}</div>;
  }

  return (
    <div>
      <h2 className="font-fcfriday text-2xl mb-4">วิธีการชำระเงิน</h2>
      {clientSecret ? (
        <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      ) : (
        <p>Loading payment options...</p>
      )}
    </div>
  );
};

export default Checkout;
