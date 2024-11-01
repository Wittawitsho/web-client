import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { countConcert, topSellingConcerts } from '../../api/Concert';
import { soldTicket } from '../../api/ticket';
import useWebStore from '../../store/web-store'; // ถ้าคุณใช้ store เพื่อเก็บ token

const Dashboard = () => {
  const token = useWebStore((state) => state.token);
  const [concertCount, setConcertCount] = useState(0); // สร้าง state สำหรับเก็บจำนวนคอนเสิร์ต
  const [ticketsSold, setTicketsSold] = useState(0); // สร้าง state สำหรับเก็บจำนวนบัตรที่ขาย
  const [topConcerts, setTopConcerts] = useState([]); 
  
  const fetchConcertCount = async () => {
    try {
      const res = await countConcert(token)
      setConcertCount(res.data.count); // อัปเดต state หลังจากได้รับข้อมูล
    } catch (err) {
      console.error('Error fetching concert count:', err);
    }
  };
  const fetchTicketsSold = async () => {
    try {
      const response = await soldTicket(token)
      setTicketsSold(response.data.sold); // เก็บจำนวนบัตรที่ขายใน state
    } catch (err) {
      console.error('Error fetching tickets sold:', err);
    }
  };
  const fetchTopSellingConcerts = async () => {
    try {
      const res = await topSellingConcerts(token);
      console.log(res)
      setTopConcerts(res.data); // อัปเดตข้อมูลคอนเสิร์ตที่ขายดีสุด
    } catch (err) {
      console.error('Error fetching top concerts:', err);
    }
  };
  
  // เรียกใช้ฟังก์ชันดึงข้อมูลเมื่อคอมโพเนนต์โหลด
  useEffect(() => {
    if (token) {
      fetchConcertCount();
      fetchTicketsSold();
      fetchTopSellingConcerts();
    }
  }, [token]);
  return (
    <div className="w-full font-fcfriday"> {/* เพิ่ม Flexbox และความสูงให้กับ div หลัก */}
      
    
      {/* Main Content */}
      <div className="h-screen bg-gray-300 p-6">
        <h1 className="text-4xl mb-5">Dashboard</h1>

        {/* Dashboard Cards */}
        <div className="grid grid-cols-6 gap-6">
          {/* Card for Users */}
          <div className="flex flex-col justify-center items-center bg-white p-2 rounded-lg shadow-lg ">
            <h2 className="text-3xl">จำนวนคอนเสิร์ต</h2>
            <h2 className="text-7xl">{concertCount}</h2>
          </div>

          {/* Card for Reports */}
          <div className="flex flex-col justify-center items-center bg-white p-2 rounded-lg shadow-lg ">
            <h2 className="text-3xl">บัตรที่ขายแล้ว</h2>
            <h2 className="text-7xl">{ticketsSold}</h2>
          </div>
        </div>
        <h2 className="text-3xl mt-10 mb-5">คอนเสิร์ตที่นิยมที่สุด</h2>
        <div className="flex space-x-5">
        {topConcerts.map((concert, index) => (
            <div key={index} className="bg-gray-400 w-64 h-96 rounded-lg flex flex-col items-center">
              <img 
              src={concert.images.length > 0 ? concert.images[0].url : '/bg.jpg'} 
              alt="concert poster" 
              className="w-52 h-64 mt-5 rounded-lg" 
              />
              <div className="w-full text-left p-2 ml-5 flex flex-col">
                <h2 className="text-xl font-fcfriday mb-5">{concert.name}</h2>
                <span className="font-fcfriday">{concert.date}</span>
                <span className="font-fcfriday">{concert.time}</span>
                <span className="font-fcfriday">{concert.location}</span>
                <span className="font-fcfriday">บัตรขายแล้ว: {concert.ticketsSold} ใบ</span> {/* แสดงจำนวนบัตรที่ขายแล้ว */}
              </div>
            </div>
          ))}
            </div>
      </div>
    </div>
  );
};

export default Dashboard;
