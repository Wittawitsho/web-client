import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useWebStore from '../../store/web-store'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate()
  const actionLogin = useWebStore((state)=>state.actionLogin)
  const user = useWebStore((state)=>state.user)
  console.log('user from zustand', user)
  const [ form, setForm ] = useState({
    email:"",
    password:"",
    
  })
  
  const handleOnChange = (e)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }
  const roleRedirect = (role)=> {
    if(role === 'admin'){
      navigate('/admin')
    }else{
      //navigate('/user')
      navigate(-1)
    }
  }
  const handleSubmit = async (e)=>{
    e.preventDefault()
    // console.log(form)
    // ส่งให้ backend
    try{
      const res = await actionLogin(form)
      const role = res.data.payload.role
      console.log('role', role)
      roleRedirect(role)
      toast.success('welcome')
    } catch(err){
      console.log(err)
      const errMsg = err.response?.data?.message
      toast.error(errMsg)
    }
    
    
    
  }
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div>
    <div className="flex flex-col items-center justify-center">
      <div className="p-6 w-96 mt-8 font-fcfriday">
        <h2 className="text-3xl text-center mb-4">เข้าสู่ระบบ</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4 text-xl">
            <label htmlFor="email" className="">อีเมล</label>
            <input className="border border-gray-300 rounded-lg w-full p-2 mt-1"
              onChange={handleOnChange}
              name="email"
              type="email"
            />
          </div>
          <div className="mb-4 text-xl">
            <label htmlFor="password" className="">รหัสผ่าน</label>
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
          <div className="text-end mt-4">
          <a href="#" className="text-blue-500 underline underline-offset-2">ลืมรหัสผ่าน?</a>
        </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded-lg w-full py-2 mt-4 hover:bg-blue-600"
          >
            เข้าสู่ระบบ
          </button>
          </form>
        
        <div className="flex items-center justify-center mt-4">
          <hr className="w-1/3" />
          <span className="mx-2 text-gray-500">หรือ</span>
          <hr className="w-1/3" />
        </div>
        <div className="flex flex-col mt-4">
          <button className="bg-red-600 text-white rounded-lg py-2 mb-2 hover:bg-red-700">
            เข้าสู่ระบบด้วย Google
          </button>
          <button className="bg-blue-600 text-white rounded-lg py-2 hover:bg-blue-700">
            เข้าสู่ระบบด้วย Facebook
          </button>
          <div className="flex justify-center text-xl mt-5">
          <h2>ไม่มีบัญชีใช่ไหม?</h2>
          <h2 className="ml-2 text-blue-500">ลงทะเบียน</h2>
          </div>
        </div>
      </div>
    </div>
    
    </div>
  );
};

export default Login;
