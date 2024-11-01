import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar = () => {
  return (
    <div>
    <nav className="bg-white p-3">
        {/* container: กำหนดความกว้างของ container ตามขนาดหน้าจอ  mx-auto: ตั้งค่า margin ทางแนวนอนเป็นอัตโนมัติ เพื่อให้ div อยู่กึ่งกลางหน้าจอ */}
        <div className="container mx-auto"> 
        {/* ใช้ flex เพื่อจัดให้องค์ประกอบใน Navbar อยู่ในแถวเดียวกัน โดยมีการจัดตำแหน่งแนวตั้งและการกระจายองค์ประกอบให้ห่างกัน*/}
            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <img src="/ticket.png" alt="TicketZone Icon" className="h-8 w-8 mr-2" />
                    <h1 className="text-black font-fcfriday text-3xl">TicketZone</h1>
                </div>
                <div className="flex space-x-10 mr-30">
                    <Link to ={'/'} className="text-black font-fcfriday text-xl">หน้าหลัก</Link>
                    <Link to ={'allconcert'} className="text-black font-fcfriday text-xl">คอนเสิร์ต</Link>
                    <Link to ={'merchandise'} className="text-black font-fcfriday text-xl">สินค้า</Link>
                    <Link to ={'help'} className="text-black font-fcfriday text-xl">ช่วยเหลือ</Link>
                </div>
                <div className="flex space-x-5">
                    <Link to ={'register'} className="text-blue-500 font-fcfriday text-xl border-2 border-blue-500 px-4 py-2 rounded-lg">ลงทะเบียน</Link>
                    <Link to ={'login'} className="text-white font-fcfriday text-xl border-2 bg-blue-500 px-4 py-2 rounded-lg">เข้าสู่ระบบ</Link>
                </div>
            </div>
        </div>
    </nav>
  
    </div>
  );
};

export default Navbar;

