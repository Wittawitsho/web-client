import React, { useState, useEffect } from 'react';
import useWebStore from '../../store/web-store'
import { toast } from 'react-toastify';
import { createTicket } from '../../api/ticket';

const Add_Ticket = () => {
  const token = useWebStore((state)=> state.token)
  const [form, setForm] = useState({
    title: "",
    price: "",
    quantity: ""

  })
  /* const getConcert = useWebStore((state)=> state.getConcert)
  const concerts = useWebStore((state)=> state.concerts)
  useEffect(()=>{
    getConcert(token)
  },[])
  console.log(concerts) */

  const handleOnChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }
const handleSubmit = async (e) => {
  e.preventDefault()
  try{
    const res = await createTicket(token,form)
    console.log(res.data.title)
    toast.success(`Add Concert ${res.data.title} success!!!`)
  }catch(err){
    console.log(err)
  }

}
  return (
    <div className=" w-full font-fcfriday">


      <div className="h-screen bg-gray-300 p-6">
        <h1 className="text-2xl mb-5">{'<'} ย้อนกลับ</h1>
        <form onSubmit={handleSubmit}  className="bg-white p-6 rounded-lg shadow-lg h-[85vh] overflow-y-auto">
          <div className="flex mb-4">

            {/* ฝั่งซ้าย: อัปโหลดโปสเตอร์และแสดงตัวอย่าง */}
            <div className="w-1/2 pr-4">
              <h2 className="text-lg mb-2">อัปโหลดโปสเตอร์</h2>
            </div>

            {/* ฝั่งขวา: กรอกข้อมูลคอนเสิร์ต */}
            <div className="w-1/2 pl-4">
            <div className="grid grid-cols-3">
              <div className="">
                <h2 className="block text-lg " >ประเภทบัตร</h2>
                <input className="w-3/4 p-2 border rounded "
                  onChange={handleOnChange}
                  placeholder='Title'
                  name="title"
                  type="text"
                />
              </div>
              <div className="">
                <h2 className="text-lg ">ราคาบัตร</h2>
                <input className="w-3/4 p-2 border rounded "
                  onChange={handleOnChange}
                  placeholder='Price'
                  name="price"
                  type="number"
                />
              </div>
              <div className="">
                <h2 className="block text-lg " >จำนวนบัตร</h2>
                <input className="w-3/4 p-2 border rounded"
                  onChange={handleOnChange}
                  placeholder='Quantity'
                  name="quantity"
                  type="number"
                />
              </div>
              </div>

              <button type="submit" className="w-full text-xl px-4 py-2 text-white bg-blue-500 rounded mt-5">เพิ่มบัตร</button>
            </div>

          </div>


        </form>
      </div>
    </div>
  );
};

export default Add_Ticket;
