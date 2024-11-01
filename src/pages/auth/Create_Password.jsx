import React, { useState } from 'react';


const Create_Password = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleCreatePassword = (e) => {
    e.preventDefault();
    // Logic for handling password creation goes here
    if (password !== confirmPassword) {
      alert('รหัสผ่านไม่ตรงกัน');
    } else {
      console.log('Password created:', password);
    }
  };

  return (
    <div>
      
      <div className="flex flex-col items-center justify-center">
        <div className="p-6 w-96 mt-8 font-fcfriday">
          <h2 className="text-3xl text-center mb-4">สร้างรหัสผ่าน</h2>
          <h3 className="flex justify-center text-gray-500 whitespace-nowrap mb-5">ใช้อักขระอย่างน้อย 10 ตัว รวมถึงตัวอักษร ตัวพิมพ์เล็ก และตัวเลข</h3>
          <form onSubmit={handleCreatePassword}>
            <div className="mb-4 text-xl">
              <label htmlFor="password" className="">รหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-4 text-gray-500 focus:outline-none"
                >
                  <img 
                    src={showPassword ? '/hide.png' : '/view.png'}
                    alt={showPassword ? 'Hide password' : 'Show password'}
                    className="w-5 h-5" // ปรับขนาดตามที่ต้องการ
                  />
                </button>
              </div>
            </div>

            <div className="mb-4 text-xl">
              <label htmlFor="confirmPassword" className="">ยืนยันรหัสผ่าน</label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-4 text-gray-500 focus:outline-none"
                >
                  <img 
                    src={showConfirmPassword ? '/hide.png' : '/view.png'}
                    alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="w-5 h-5" // ปรับขนาดตามที่ต้องการ
                  />
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white rounded-lg w-full py-2 mt-4 hover:bg-blue-600"
            >
              สร้างรหัสผ่าน
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Create_Password;
