import React from 'react';
import Footer from '../../components/Footer';
const Merchandise = () => {
  // ข้อมูลรายการแนะนำ
  return (
    <div>
       {/* ส่วนรายการทั้งหมด */}
       <div className="mt-14 ml-32 mr-32">
  <h1 className="font-fcfriday text-3xl">สินค้า</h1>
  <div className="mt-8">
    {/* แถวแรก */}
    <div className="flex space-x-5 mb-5">
  {[...Array(4)].map((_, index) => (
    <div key={index} className="bg-gray-400 w-full  rounded-lg flex flex-col items-center">
      <img src="/bg.jpg" alt="bg" className="w-64 h-56 mt-5 rounded-lg" />
      <div className="w-full text-left p-2 flex flex-col">
        <h2 className="text-2xl font-fcfriday mb-2 ml-4">หมวก CAT ไลฟ์แพรว</h2>
        <span className="font-fcfriday ml-4">2-3 พ.ย. 24</span>
        <div className="ml-3 mr-3 mt-3">
            <button className="bg-blue-500 text-white font-fcfriday text-xl rounded-lg w-full">
                สั่งซื้อ
            </button>
        </div>
      </div>
    </div>
  ))}
</div>

          {/* แถวที่สอง */}
          <div className="flex space-x-5 mb-5">
  {[...Array(4)].map((_, index) => (
    <div key={index} className="bg-gray-400 w-full  rounded-lg flex flex-col items-center">
      <img src="/bg.jpg" alt="bg" className="w-64 h-56 mt-5 rounded-lg" />
      <div className="w-full text-left p-2 flex flex-col">
        <h2 className="text-2xl font-fcfriday mb-2 ml-4">หมวก CAT ไลฟ์แพรว</h2>
        <span className="font-fcfriday ml-4">2-3 พ.ย. 24</span>
        <div className="ml-3 mr-3 mt-3">
            <button className="bg-blue-500 text-white font-fcfriday text-xl rounded-lg w-full">
                สั่งซื้อ
            </button>
        </div>
      </div>
    </div>
  ))}
</div>
        </div>
      </div>
      

<Footer />
    </div>
  );
};

export default Merchandise;