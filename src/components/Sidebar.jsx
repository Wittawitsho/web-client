import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // ใช้ useLocation เพื่อดึงเส้นทางปัจจุบัน

const Sidebar = () => {
  const location = useLocation(); // ดึงเส้นทางปัจจุบัน

  return (
    <div className="ml-32 mt-8 font-fcfriday">
      <div className="h-full w-64 bg-gray-300 text-black text-xl flex flex-col rounded-lg">
        <ul>
          {/* ลิงก์ไปยังหน้าอื่นๆ */}
          <li className={`flex justify-between hover:text-white hover:bg-blue-500 p-4  ${location.pathname === '/profile' ? 'bg-blue-500 text-white' : ''}`}>
            <Link to="/profile" className="ml-16 ">จัดการโปรไฟล์</Link>
            <h2>{'>'}</h2>
          </li>
          <li className={`flex justify-between hover:text-white hover:bg-blue-500 p-4  ${location.pathname === '/myticket' ? 'bg-blue-500 text-white' : ''}`}>
            <Link to="/myticket" className="ml-16">บัตรของฉัน</Link>
            <h2>{'>'}</h2>
          </li>
  
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
