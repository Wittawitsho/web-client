import React, { useState, useEffect } from 'react'; 
import { useParams } from 'react-router-dom';
import useWebStore from '../../store/web-store';
import { readConcert, readPoster } from '../../api/Concert';
import { listTicket } from '../../api/ticket';

const Dashboard_Concert_Detail = () => {
  const { id } = useParams();  // ดึง id จาก URL
  const token = useWebStore((state) => state.token);
  const [concert, setConcert] = useState(null);
  const [tickets, setTickets] = useState([]); // State สำหรับข้อมูลตั๋ว
  const [poster, setPoster] = useState(null);
  // ดึงข้อมูลคอนเสิร์ตเมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    handelGetConcert(id)
    handelGetPoster(id)
    handelGetTicket(id)

  }, [id]);
  const handelGetPoster = async (id) => {
    await readPoster(id)
        .then((res) => {
          setPoster(res.data);
        })
        .catch((err) => {
            console.log("Order Details Error:", err);
        })}
  const handelGetConcert = async (id) => {
    await readConcert(id)
        .then((res) => {
          setConcert(res.data);
        })
        .catch((err) => {
            console.log("Order Details Error:", err);
        });
};
const handelGetTicket = async (id) => {
  await listTicket(id)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
          console.log("Order Details Error:", err);
      });
};
  // คำนวณจำนวนบัตรทั้งหมดที่ขายได้
  const totalSold = tickets.reduce((sum, ticket) => sum + ticket.sold, 0);

  return (
    <div className="w-full font-fcfriday">
      <div className="h-screen bg-gray-300 p-6">
        <h1 className="text-2xl mb-5">{'<'} ย้อนกลับ</h1>
        <div className="flex">
          {/* ฝั่งซ้าย: โปสเตอร์คอนเสิร์ต */}
          <div className="w-1/4 p-4">
          <img src={poster && poster.length > 0 ? poster[0].url : "/bg.jpg"} alt="โปสเตอร์" className="w-full h-80 rounded-lg" />

          </div>

          {/* ฝั่งขวา: รายละเอียดคอนเสิร์ต */}
          <div className="w-3/4 p-4 flex flex-col justify-center">
            {/* ชื่อคอนเสิร์ต */}
            <div className="bg-white p-4 rounded-lg w-full mb-4">
              <h2 className="text-3xl ">{concert?.name || 'ชื่อคอนเสิร์ต'}</h2>
            </div>

            {/* รายละเอียดคอนเสิร์ต */}
            <div className="bg-white p-4 rounded-lg w-full mb-4">
              <h3 className="text-xl ">รายละเอียด:</h3>
              <p className="text-lg">วันที่: {concert?.date || 'ไม่ทราบวันที่'}</p>
              <p className="text-lg">เวลา: {concert?.time || 'ไม่ทราบเวลา'}</p>
              <p className="text-lg">สถานที่: {concert?.location || 'ไม่ทราบสถานที่'}</p>
            </div>

            {/* แสดงข้อมูลบัตร */}
            <div className="bg-white p-4 rounded-lg w-full ">
              <h3 className="text-2xl ">บัตรที่ขายได้:</h3>
              {tickets.length > 0 ? (
                <ul>
                  {tickets.map((ticket) => (
                    <li key={ticket.id} className="flex justify-between mb-2">
                      <span className="text-xl">{ticket.title}</span> {/* แก้ไขเป็น ticket.title */}
                      <span className="text-xl">{ticket.sold} ใบ</span> {/* แสดงจำนวนบัตรแต่ละประเภท */}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>ไม่มีบัตรที่ขายได้</p>
              )}
              {/* แสดงผลรวมจำนวนบัตรที่ขายได้ทั้งหมด */}
              <h3 className="text-xl mt-4">จำนวนบัตรทั้งหมดที่ขายได้: {totalSold} ใบ</h3>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard_Concert_Detail;
