import React from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom'; // ใช้ useLocation เพื่อดึงเส้นทางปัจจุบัน

const SidebarAdmin = () => {
  const location = useLocation();
  
  return (
    <div className='flex'>
      {/* Sidebar */}
      <aside className="w-64 bg-white font-fcfriday ">
        <div className="flex justify-center items-center py-4 mb-10">
          <img src="/ticket.png" alt="TicketZone Icon" className="h-8 w-8 mr-2" />
          <h1 className="text-3xl">TicketZone</h1>
        </div>
        
        <ul className="text-2xl flex flex-col items-center">
          {/* ลิงก์ไปยังหน้าอื่นๆ */}
          <li className={`hover:text-white hover:bg-blue-500 w-full text-center ${location.pathname === '/admin' ? 'bg-blue-500 text-white' : ''}`}>
            <Link to="" className="block p-4">Dashboard</Link>
          </li>
          <li className={`hover:text-white hover:bg-blue-500 w-full text-center ${location.pathname === '/admin/concertmanagement' ? 'bg-blue-500 text-white' : ''}`}>
            <Link to="concertmanagement" className="block p-4">จัดการคอนเสิร์ต</Link>
          </li>
        </ul>
        
      </aside>
      <Outlet />
    </div>
  );
};

export default SidebarAdmin;
