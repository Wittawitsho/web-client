import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import { readConcert, readPoster } from '../../api/Concert';
import Footer from '../../components/Footer';

const Concert_Detail = () => {

  const { id } = useParams();  // ดึง id จาก URL
  const navigate = useNavigate();
  const [concert, setConcert] = useState(null);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchConcertDetail = async () => {
      try {
        const response = await readConcert(id);
        setConcert(response.data);
      } catch (err) {
        console.error('Error fetching concert details:', err);
      }
    };

    const fetchConcertPoster = async () => {
      try {
        const response = await readPoster(id);
        console.log('Poster Data:', response.data);
        setPoster(response.data);
      } catch (err) {
        console.error('Error fetching concert poster:', err);
      }
    };

    if (id) {
      fetchConcertDetail();
      fetchConcertPoster(); 
    }
  }, [id]);
  console.log('Concert ID:', id); 
  const handlePurchaseClick = () => {
    navigate(`/user/puschaseticket/${id}`); 
  };
  return (
    <div>
      {/* ย้อนกลับ */}
      <button 
      className="font-fcfriday ml-32 mt-12 text-2xl"
      onClick={() => navigate(-1)}>{'<'} 
        ย้อนกลับ
      </button>
      {/* กล่องข้อมูลคอนเสิร์ต */}
      <div className="flex justify-center ml-16 mt-5 mb-36">
        {/* ฝั่งซ้าย - โปสเตอร์คอนเสิร์ต */}
        <div className="mr-20">
        <div>
            {poster && poster.length > 0 ? (
              <img src={poster[0].url} alt="Concert Poster" className="w-96 h-[32rem]  rounded-lg" />
            ) : (
              <div className="w-96 h-[32rem] rounded-lg bg-gray-200 flex items-center justify-center">
                รูป
              </div>
            )}
          </div>
        </div>

        {/* ฝั่งขวา - กล่องข้อมูลคอนเสิร์ต */}
        <div className="flex flex-col w-[40rem] h-[32rem]">
          <div className="bg-secondary rounded-lg">
            {/* กล่องข้อมูล */}
            <div className="font-fcfriday p-5">
              <h2 className="text-5xl mb-4">{concert?.name}</h2>
              {/* วันที่ */}
              <div className="flex space-x-2">
                <img src="https://res.cloudinary.com/dtszdlqut/image/upload/v1730383165/Web/jnq1syp4n7yrm1jjtafv.png" 
                alt="calendar" className="w-4 h-4 mt-1" />
                <p className="text-xl">{new Date(concert?.date).toLocaleDateString()}</p>
                
              </div>
              {/* เวลา */}
              <div className="flex space-x-2">
                <img src="https://res.cloudinary.com/dtszdlqut/image/upload/v1730383166/Web/ct8mbkeezenuudx4wcfs.png" 
                alt="clock" className="w-4 h-4 mt-2" />
                <p className="text-xl">{concert?.time}</p>
              </div>

              {/* สถานที่ */}
              <div className="flex space-x-2">
                <img src="https://res.cloudinary.com/dtszdlqut/image/upload/v1730383166/Web/yqbptljonudhi7udeklm.png" 
                alt="location" className="w-4 h-4 mt-2" />
                <p className="text-xl">{concert?.location}</p>
              </div>
            </div>
          </div>
        
          {/* กล่องปุ่ม */}
          <div className="mt-auto bg-secondary rounded-lg p-5 flex justify-between items-center">
            <div className="font-fcfriday">
              <h2 className="text-xl">ราคาเริ่มต้น :</h2>
              <h1 className="text-2xl">{concert?.priceStart}</h1>
            </div>
            <button
              className="bg-blue-500 text-white font-fcfriday text-xl rounded-full py-2 px-6"
              onClick={handlePurchaseClick} // Add click event handler
            >
              ซื้อบัตร
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Concert_Detail;
