import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const Navbar_onlyLogo = () => {
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
            </div>
        </div>
    </nav>
    <Outlet />
    </div>
  );
};

export default Navbar_onlyLogo;

