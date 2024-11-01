import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';


const Register = () => {
  
  const [ form, setForm ] = useState({
    email:"",
    password:"",
    confirmPassword:""
  })
  
  const handleOnChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }

  const handleSubmit = async (e)=>{
    e.preventDefault()
    if( form.password != form.confirmPassword) {
      return alert("Confirm Password is not match!!!")
    }
    console.log(form)
    // ส่งให้ backend
    try{
      const res = await axios.post('http://localhost:5000/api/register', form)
      console.log(res.data)
      toast.success(res.data)
    }catch(err){
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
      console.log(err)
    }
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

 

  return (
    <div>
    <form onSubmit={handleSubmit}>
      <div className="flex items-center justify-center">
        <div className="p-6 w-1/2 mt-8 font-fcfriday">
          <h2 className="text-3xl text-center mb-4">ลงทะเบียน</h2>
          <div className='grid grid-cols-2 gap-5'>
            <div>
            <div className="mb-4 text-xl">
              <h1>อีเมล</h1>
              <input className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                onChange={handleOnChange}
                name="email"
                type="email"
              />
            </div>
            <div className="mb-4 text-xl">
              <h1>รหัสผ่าน</h1>
              <div className="relative">
                <input className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                  onChange={handleOnChange}
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  
                  
                />
                <button className="absolute right-4 top-4 text-gray-500 focus:outline-none"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  
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
              <h1>ยืนยันรหัสผ่าน</h1>
              <div className="relative">
                <input className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                  onChange={handleOnChange}
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  
                  
                />
                <button className="absolute right-4 top-4 text-gray-500 focus:outline-none"
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  
                >
                  <img 
                    src={showConfirmPassword ? '/hide.png' : '/view.png'}
                    alt={showConfirmPassword ? 'Hide password' : 'Show password'}
                    className="w-5 h-5" // ปรับขนาดตามที่ต้องการ
                  />
                </button>
              </div>
            </div>
            </div>
            <div>
            <div className="mb-4 text-xl">
              <h1>ชื่อ</h1>
              <input className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                onChange={handleOnChange}
                name="name"
                type="text"
              />
            </div>
            <div className="mb-4 text-xl">
              <h1>นามสกุล</h1>
              <input className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                onChange={handleOnChange}
                name="lastname"
                type="text"
              />
            </div>
            <div className="mb-4 text-xl">
              <h1>เบอร์โทรศัพท์</h1>
              <input className="border border-gray-300 rounded-lg w-full p-2 mt-1"
                onChange={handleOnChange}
                name="tel"
                type="text"
              />
            </div>
            </div>
            <button className="bg-blue-500 text-white rounded-lg w-full py-2 mt-4 hover:bg-blue-600"
              type="submit"
              
            >
              ลงทะเบียนด้วยอีเมล
            </button>
            </div>
          
          <div className="flex items-center justify-center mt-4">
            <hr className="w-1/3" />
            <span className="mx-2 text-gray-500">หรือ</span>
            <hr className="w-1/3" />
          </div>
          
          <div className="flex flex-col mt-4">
            <button className="bg-red-600 text-white rounded-lg py-2 mb-2 hover:bg-red-700">
              ลงทะเบียนด้วย Google
            </button>
            <button className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
              ลงทะเบียนด้วย Facebook
            </button>
          </div>

          <div className="flex justify-center text-xl mt-5">
            <h2>มีบัญชีแล้วใช่ไหม?</h2>
            <h2 className="ml-2 text-blue-500">เข้าสู่ระบบ</h2>
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Register;
