import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useWebStore from '../../store/web-store'
import Footer from '../../components/Footer';
import SearchBar from '../../components/SearchBar';

const Home = () => {
  const getConcert = useWebStore((state)=>state.getConcert)
  const concerts = useWebStore((state)=>state.concerts)
  const getSuggestConcert = useWebStore((state)=>state.getSuggestConcert)
  const suggestConcerts = useWebStore((state)=>state.suggestConcerts)

  useEffect(() => {
    getSuggestConcert();
    getConcert();
  }, []);

  return (
    <div>
      {/* ใช้ flex เพื่อจัดตำแหน่ง div ให้อยู่กลางหน้าจอในแนวนอนและจัดแนวแกนกลางในแนวตั้ง */}
      <div className="flex justify-center items-center">
        {/* สี่เหลี่ยมสีดำ */}
        <img src='https://res.cloudinary.com/dtszdlqut/image/upload/v1730372790/Web/dv4oxpm6xof5q7sgesrf.png' 
        className=" w-10/12 h-52 rounded-lg mt-5 object-cover" />
        {/* สี่เหลี่ยมสีขาว สำหรับแถบค้นหา */}
        <SearchBar />
      </div>
      {/* แสดงรายการแนะนำด้านล่าง */}
      <div className="mt-16 ml-32 mr-32">
        <h1 className="font-fcfriday text-3xl ">รายการแนะนำ</h1>
        {/* กล่องสำหรับรายการแนะนำ */}
        <div className="w-full rounded-lg mt-4 flex flex-no-wrap overflow-x-scroll scrolling-touch items-start mb-8">
          {/* รายการสินค้าแนะนำ */}
          <div className="flex space-x-5">
            {/* รายการสินค้าแต่ละรายการ */}
          {
            suggestConcerts.map((item, index) =>
            <Link key={index} to={`/concertdetail/${item.id}`} 
            className="bg-secondary w-60 h-96 rounded-lg flex flex-col items-center">
            <div>
            {
              item.images && item.images.length > 0
              ? <img src={item.images[0].url} 
                className="w-52 h-64 mt-2 rounded-lg"/>
              : <img src="/bg.jpg" alt="bg" className="w-52 h-64 mt-2 rounded-lg" /> 
            }
            </div>
            <div className="w-full text-left ml-8  flex flex-col">
              <h2 className="text-2xl font-fcfriday mb-1">{item.name}</h2>
              <span className="font-fcfriday">{item.date}</span>
              <span className="font-fcfriday">{item.time}</span>
              <span className="font-fcfriday">{item.location}</span>
            </div>
            </Link>
            )
          }
          </div>
        </div>
      </div>
      {/* ส่วนรายการทั้งหมด */}
      <div className="mt-15 ml-32 mr-32">
        <h1 className="font-fcfriday text-3xl">รายการทั้งหมด</h1>
        {/* กล่องสำหรับรายการทั้งหมด */}
        <div className="mt-8 grid grid-cols-4 gap-5 gap-x-24 ">
        {/* แถวที่มี 4 คอลัมน์ */}
        {
          concerts.map((item, index) =>
          <Link key={index} to={`/concertdetail/${item.id}`} 
          className="bg-secondary w-60 h-96 rounded-lg flex flex-col items-center">
          <div>
            {
              item.images && item.images.length > 0
              ? <img src={item.images[0].url} 
              className='w-52 h-64 mt-2 rounded-lg' />
              : <img src="/bg.jpg" alt="bg" className="w-52 h-64 mt-2 rounded-lg" />
            }
          </div>
          <div className="w-full text-left ml-8  flex flex-col">
              <h2 className="text-2xl font-fcfriday mb-1">{item.name}</h2>
              <span className="font-fcfriday">{item.date}</span>
              <span className="font-fcfriday">{item.time}</span>
              <span className="font-fcfriday">{item.location}</span>
            </div>
          </Link>
          )
        }
        </div>
      </div>
      <div className="flex justify-center mt-4">
        <Link to= {'allconcert'} 
        className="font-fcfriday text-2xl">
          ดูเพิ่มเติม {'>'}
        </Link>
      </div>
    <Footer />
    </div>
  );
};
export default Home;