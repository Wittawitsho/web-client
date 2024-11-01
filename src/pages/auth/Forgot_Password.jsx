import React, { useState } from 'react';

const Forgot_Password = () => {
  const [email, setEmail] = useState('');

  const handleForgotPassword = (e) => {
    e.preventDefault();
    // Logic for handling forgot password goes here
    console.log('Email:', email);
    alert('ลิงก์สำหรับกู้รหัสผ่านจะถูกส่งไปที่อีเมลของคุณ');
  };

  return (
    <div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 w-96 mt-8 font-fcfriday">
          <h2 className="text-3xl text-center mb-4">ลืมรหัสผ่าน</h2>
          <p className="flex justify-center text-center mb-4 text-gray-600 whitespace-nowrap">
          เราจะส่งลิงก์เพื่อรีเซ็ตให้คุณ ป้อนที่อยู่อีเมลของคุณที่ใช้สําหรับ TicketZone
          </p>
          <form onSubmit={handleForgotPassword}>
            <div className="mb-4 text-xl">
              <label htmlFor="email" className="">อีเมลของคุณ</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg w-full py-2 mt-4 hover:bg-blue-600"
            >
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
          </form>
          <div className="flex justify-center text-xl mt-5">
            <h2>นึกออกแล้ว?</h2>
            <a href="/login" className="ml-2 text-blue-500 underline underline-offset-2">เข้าสู่ระบบ</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Forgot_Password;
