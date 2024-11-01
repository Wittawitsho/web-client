import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import useWebStore from "../store/web-store";
import { payment } from "../api/stripe";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe("pk_test_51QE62SB3qV93AT6MF5RouLqMNIHV9TxNoQmDq3grKl6M4vBiXWKXTtGmMyItnpmddzm1aiW3PUYthqSb9J4baX5w00ymN4EhMX");


const PromptCre = () => {
    const token = useWebStore((s)=>s.token)
    const [clientSecret, setClientSecret]=useState("");
    const [paymentMethod, setPaymentMethod] = useState(''); // เก็บข้อมูลวิธีการชำระเงินที่เลือ
useEffect(()=>{
    payment(token)
    .then((res)=>{
        console.log(res)
        setClientSecret(res.data.clientSecret)
    })
    .catch((err)=>{
        console.log(err)
    })
},[])

const appearance = {
    theme: 'stripe',
  };
  // Enable the skeleton loader UI for optimal loading.
  const loader = 'auto';

    return (
      <div>
        
    <h2 className="font-fcfriday text-2xl mb-4">วิธีการชำระเงิน</h2>
    <div className={`w-full text-xl font-fcfriday p-4 rounded-lg mr-10 mb-3 ${
      paymentMethod === 'promptpay' ? 'bg-blue-400' : 'bg-gray-300'
    }`}>
      <label className="block">
        <input
          type="radio"
          name="payment"
          value="promptpay"
          className="mr-2"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        พร้อมเพย์
      </label>
    </div>
    {paymentMethod === 'promptpay' && (
      <div className="bg-gray-300 p-3 px-5 -mt-5 mb-3 font-fcfriday">
        <h1>ขั้นตอนการชำระเงิน</h1>
          <p>หลังจากกดยืนยันการชำระเงิน ระบบจะสร้าง QR Code สำหรับชำระเงิน ท่านสามารถสแกน QR Code และชำระเงินได้ทันที</p>
      </div>
    )}
    <div className={`w-full text-xl font-fcfriday p-4 rounded-lg mr-10 mb-3 ${
      paymentMethod === 'credit-card' ? 'bg-blue-400' : 'bg-gray-300'
    }`}>
    
    
      <label className="block">
        <input
          type="radio"
          name="payment"
          value="credit-card"
          className="mr-2"
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        บัตรเครดิต/เดบิต
      </label>
    
    </div>
    
    {/* ฟอร์มกรอกข้อมูลบัตรเครดิต หากเลือก "บัตรเครดิต/เดบิต" */}
    {paymentMethod === 'credit-card' && clientSecret && (
                <Elements options={{ clientSecret, appearance, loader }} stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>
            )}
  </div>
);
};

export default PromptCre;