import React from 'react';
import { Link } from 'react-router-dom'; // Import Link จาก react-router-dom


const Check_Inbox = () => {
  return (
    <div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 w-96 mt-8 font-fcfriday text-center">
          <img 
            src="/check_email.png"  // ใส่ path ไอคอนที่ต้องการ (ไอคอนซองจดหมาย)
            alt="Check your inbox"
            className="w-full h-full mb-6 " // ปรับขนาดตามต้องการ
          />
          <h2 className="text-3xl mb-4">ตรวจสอบกล่องจดหมายของคุณ</h2>
          
          <Link
            to="/login" 
            className="bg-blue-500 text-white rounded-lg w-full py-2 mt-4 hover:bg-blue-600 text-center block"
          >
            กลับไปเข้าสู่ระบบ
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Check_Inbox;
