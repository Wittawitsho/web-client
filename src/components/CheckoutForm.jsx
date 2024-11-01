import React, { useState } from "react";
import { saveOrder } from "../api/user";
import useWebStore from "../store/web-store";
import { useParams, useNavigate } from 'react-router-dom';
import '../stripe.css'
import {
  PaymentElement,
  useStripe,
  useElements
} from "@stripe/react-stripe-js";

export default function CheckoutForm({dpmCheckerLink}) {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate()
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const token = useWebStore((s)=>s.token)
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    setIsLoading(true);

    const payload = await stripe.confirmPayment({
      elements,
      /* confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: "http://localhost:3000/complete",
      }, */
      redirect:'if_required'
    });
    
    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, your customer will be redirected to
    // your `return_url`. For some payment methods like iDEAL, your customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (payload.error) {
      setMessage(payload.message);
    } else {
        saveOrder(token,payload)
        .then((res)=>{
            console.log(res)
        })
        .catch((err)=>{
            console.log(err)
        })
        
    }

    setIsLoading(false);
  };

  const paymentElementOptions = {
    layout: "tabs"
  }

  return (
    <>
      <form 
      className="space-y-6"
      id="payment-form" onSubmit={handleSubmit}>

        <PaymentElement id="payment-element" options={paymentElementOptions} />
        <button 
        className="stripe-button"
        disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text" 
          onClick={() => {
            setTimeout(() => {
              navigate('/user/myticket');
            }, 5000); // 2000 milliseconds = 2 seconds delay
          }}>
            {isLoading ? <div className="spinner" id="spinner"></div> : "Pay now"}
          </span>
        </button>
        {/* Show any error or success messages */}
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* [DEV]: Display dynamic payment methods annotation and integration checker */}
      <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
          <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">Preview payment methods by transaction</a>
        </p>
      </div>
    </>
  );
}