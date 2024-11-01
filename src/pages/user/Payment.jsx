import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { createUserCart, listUserCart } from '../../api/user';
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import PromptCre from "../../components/PromptCre";
import useWebStore from '../../store/web-store';
import Checkout from "./Checkout";
import { currentUser } from '../../api/auth';
const stripePromise = loadStripe("pk_test_51QE62SB3qV93AT6MF5RouLqMNIHV9TxNoQmDq3grKl6M4vBiXWKXTtGmMyItnpmddzm1aiW3PUYthqSb9J4baX5w00ymN4EhMX");


const Payment = () => {
  
  const token = useWebStore((state)=>state.token)
  const [ tickets , setTickets] = useState([])
  const [ cartTotal , setCartTotal] = useState(0)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [form, setForm] = useState(null);
  
  const [timeLeft, setTimeLeft] = useState(300); // 5 นาที = 300 วินาที
  const [paymentMethod, setPaymentMethod] = useState(''); // เก็บข้อมูลวิธีการชำระเงินที่เลือก
  useEffect(()=>{
    handleGetUserCart(token)
    fetchUser();
  },[])
  const fetchUser = async () => {
    if (token) {
        try {
            const response = await currentUser(token);
            console.log("User data:", response);
            setForm(response.data.user);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    }
};
  const handleGetUserCart = (token) =>{
    listUserCart(token)
    .then((res)=>{
      //console.log(res)
      setTickets(res.data.tickets)
      setCartTotal(res.data.cartTotal)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  const user =useWebStore((s)=> s.user)
  const getTotalPrice = useWebStore((state) => state.getTotalPrice);
  const cart = useWebStore((state)=> state.carts)
  const navigate = useNavigate()
  /* useEffect(() => {
    if (timeLeft === 0) return;
    const timer = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]); */

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

 
  const handleSelPayment  = async()=>{
      
        if (paymentMethod === 'promptpay') {
          navigate('/user/orderdetails'); // navigate to promptpay confirmation page
        } else if (paymentMethod === 'credit-card') {
          navigate('/user/myticket'); // navigate to credit card confirmation page
        }
  }
      console.log(tickets)
      const hdlGoToPayment = () => {
        
        navigate("/user/checkout");
      };
      const openCheckoutModal = () => {
        setIsCheckoutOpen(true);
      };
    
      const closeCheckoutModal = () => {
        setIsCheckoutOpen(false);
      };
  return (
    <div>
      
      {/* นับเวลาถอยหลัง */}
      <div className="bg-gray-300 font-fcfriday mt-10 rounded-lg ml-32 mr-32 p-8 text-black">
        <div className="ml-20 flex items-center space-x-4">
          <h1 className="text-5xl">{formatTime(timeLeft)}</h1>
          <h2 className="text-2xl">กรุณาทำรายการในเวลาที่กำหนด มิฉะนั้นรายการคำสั่งซื้อจะถูกยกเลิก</h2>
        </div>
      </div>
      <h2 className="font-fcfriday mt-5 ml-32 text-2xl">ข้อมูลผู้ซื้อบัตร</h2>
      {/* แบ่งครึ่งสองฝั่ง */}
      <div className="flex justify-between space-x-10 mt-5 px-32">
        
        {/* ฝั่งซ้าย - ข้อมูลผู้ซื้อและการชำระเงิน */}
        <div>
        <div className="w-full bg-gray-300 p-6 rounded-lg mr-10 mb-5">
  {/* ช่องข้อมูลผู้ซื้อ */}
  <div className="grid grid-cols-8 flex items-center justify-end gap-3 mb-4 font-fcfriday">
  <div className="col-span-1">
    <h2 className="text-xl flex justify-end">ชื่อ</h2>
  </div>
  <div className="col-span-3">
    <h1
      className="w-full text-xl p-2 border border-gray-300 rounded-lg"
      
    >{form?.name || 'ชื่อ'}</h1>
  </div>
  <div className="col-span-1">
    <h2 className="text-xl flex justify-end">นามสกุล</h2>
  </div>
  <div className="col-span-3">
    <h1
      className="w-full text-xl p-2 border border-gray-300 rounded-lg"
      
    >{form?.lastname || 'ชื่อ'}</h1>
  </div>
  <div className="col-span-1">
    <h2 className="whitespace-nowrap text-xl flex justify-end">เบอร์โทรศัพท์</h2>
  </div>
  <div className="col-span-3">
  <h1
      className="w-full text-xl p-2 border border-gray-300 rounded-lg"
      
    >{form?.tel || 'ชื่อ'}</h1>
  </div>
  <div className="col-span-1">
    <h2 className="text-xl flex justify-end">อีเมล</h2>
  </div>
  <div className="col-span-3">
  <h1
      className="w-full text-xl p-2 border border-gray-300 rounded-lg"
      
    >{form?.email || 'ชื่อ'}</h1>
  </div>
  </div>
  </div>
  
</div>


        {/* ฝั่งขวา - สรุปการซื้อ */}
        <div className="bg-gray-300 p-6 rounded-lg w-1/2 max-w-4xl mx-auto">
          <h2 className="font-fcfriday text-2xl mb-4">สรุปรายการสั่งซื้อ</h2>
  <hr className="border-gray-400 mb-4" />

  <div className="grid grid-cols-5 ">
    
    <div className="flex justify-start col-span-2">
      <img src="/bg.jpg" alt="Concert Poster" className="w-40 h-48 rounded-lg"/>
    </div>
    
    
    <div className="flex flex-col col-span-3 font-fcfriday">
      <h1 className="text-2xl">Monster Muscic Festival 2024</h1>
      {/* วันที่ */}
      <div className="flex space-x-1">
                <img src="/calendar.png" alt="calendar" className="w-4 h-4 mt-1" />
                <p className="text-base">2-3 พ.ย. 24</p>
              </div>

              {/* เวลา */}
              <div className="flex space-x-1">
                <img src="/clock.png" alt="clock" className="w-4 h-4 mt-2" />
                <p className="text-base">13:00 - 23:00 น.</p>
              </div>

              {/* สถานที่ */}
              <div className="flex space-x-1">
                <img src="/location.png" alt="location" className="w-4 h-4 mt-2" />
                <p className="text-base">ศูนย์การประชุมแห่งชาติสิริกิติ์ ฮอลล์ 1-4</p>
              </div>
            </div>
        </div>
        {
            tickets?.map((item,index)=>
              <div  key={index}>
              <div className="grid grid-cols-2 flex justify-between font-fcfriday mt-3">
      <p className="text-xl">{item.ticket.title}</p>
      <p className="text-xl ">{item.count * item.ticket.price}</p>
      <p className="text-base">{'('}{item.ticket.price} x {item.count}{')'}</p>
    </div>
    </div>
            )
          }
    <hr className="border-gray-400 mb-2" />
    <div className="flex justify-between font-fcfriday">
      <p className="text-xl">ราคารวม</p>
      <p className="text-xl">{getTotalPrice()}</p>
    </div>
    <div className="flex justify-between font-fcfriday "> 
      <p className="text-xl">ค่าธรรมเนียม</p>
      <p className="text-xl">0.00 บาท</p>
    </div>
    <hr className="border-gray-400 mt-2 mb-2" />
    <div className="flex justify-between font-fcfriday mt-3">
      <p className="text-3xl">ราคารวมสุทธิ</p>
      <p className="text-3xl">{cartTotal}บาท</p>
    </div>
    {/* Checkout Modal */}
      {isCheckoutOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500"
              onClick={closeCheckoutModal}
            >
              &times;
            </button>
            <Checkout />
          </div>
        </div>
      )}
    <button 
    onClick={openCheckoutModal}
    className="bg-blue-500 text-white font-fcfriday text-xl rounded-lg w-full p-3 mt-5">
      ยืนยันการชำระเงิน
    </button>
        </div>
        
      </div>
    </div>
  );
};

export default Payment;
