import React, { useState, useEffect } from 'react';

import useWebStore from '../../store/web-store'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import { deleteConcert } from '../../api/Concert';

const Concert_Management = () => {
  const navigate = useNavigate()
  const token = useWebStore((state)=>state.token)
  // const [concerts, setConcerts] = useState([])
  const concertsAll = useWebStore((state)=>state.concertsAll)
  const getAllConcert = useWebStore((state)=>state.getAllConcert)
  useEffect(()=>{
    getAllConcert()
    
  },[])
  const handleDelete = async (id) => {
    if (window.confirm("จะลบจริงๆ หรอ")) {
      try {
        // code
        const res = await deleteConcert(token, id);
        console.log(res);
        toast.success("Deleted สินค้าเรียบร้อยแล้ว");
        getAllConcert();
      } catch (err) {
        console.log(err);
      }
    }
  };
  /* const getAllConcert = async (token) =>{
    try{
      const res = await listConcert(token)
      setConcerts(res.data)
    }catch(err){
      console.log(err)
    }
  } */

  
  return (
    <div className=" w-full font-fcfriday"> {/* เพิ่ม Flexbox และความสูงให้กับ div หลัก */}
    
    
      {/* Main Content */}
      <div className="h-screen  bg-gray-300 p-6">
        <div className="flex justify-between mt-10 mb-5">
          <h1 className="text-3xl ">คอนเสิร์ตทั้งหมด</h1>
          <a href='addconcert'className="text-xl flex items-center px-6 rounded-lg text-white bg-blue-500">เพิ่มคอนเสิร์ต</a>
        </div>
        
        <div className="bg-white w-full h-[70vh] p-4 overflow-y-auto"> {/* เพิ่ม overflow-y-auto เพื่อให้สามารถเลื่อนดูได้ */}
          {/* ตารางแสดงข้อมูลคอนเสิร์ต */}
          <div className="flex flex-col">
            {/* แถวหัวข้อ */}
            <div className="flex justify-between text-lg border-b-2 pb-2 mb-4">
              <div className="w-1/3">ชื่อคอนเสิร์ต</div>
              <div className="w-1/3 text-center">จำนวนบัตร</div>
              <div className="w-1/3 text-center">ดำเนินการ</div>
            </div>

            {/* แถวตัวอย่างคอนเสิร์ต */}
            <ul>
              {
                concertsAll.map((item, index)=>(
                  <div key={index} className="flex justify-between items-center bg-gray-100 p-4 rounded-lg shadow-lg mb-2">
                  <div className="w-1/3 text-left">{item.name}</div>
                  <div className="w-1/3 text-center">{item.priceStart}</div>
                  <div className='w-1/3 flex justify-center gap-2'>
                  <p className="w-1/3 text-center px-4 py-2 text-white bg-blue-500 rounded">
                    <Link to = {'/admin/dashboardconcert/'+ item.id} >จัดการ</Link>
                    </p>
                    <p className="w-1/3 text-center px-4 py-2 text-white bg-yellow-500 rounded">
                    <Link to = {'/admin/editconcert/'+ item.id} >แก้ไข</Link>
                    </p>
                    <p 
                    onClick={() => handleDelete(item.id)}
                    className="w-1/3 text-center px-4 py-2 text-white bg-red-500 rounded">
                    ลบ
                    </p>
                    </div>
                </div>
                )
              )
              }
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Concert_Management;
