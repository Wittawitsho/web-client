import React, { useState } from 'react'; 

import Footer from '../../components/Footer'; 

const Help = () => { // สร้างคอมโพเนนต์ FAQ
  const [openQuestion, setOpenQuestion] = useState(null); // กำหนดสถานะสำหรับติดตามว่าคำถามไหนที่เปิดอยู่ (เริ่มต้นเป็น null)

  const faqs = [
    {
      question: "ติดต่อเรา", 
      answer: (
        <div>
          <ul>
            <li>อีเมล : ticketzone888@gmail.com</li>
            <li>Facebook : www.facebook.com/ticketzone</li>
            <li>เบอร์โทรศัพท์ : 02-222-xxxx</li>
          </ul>
        </div>
      )
    },
    {
      question: "เกียวกับบัตร", 
      answer: (
        <div>
          <ul>
            <li>การส่งบัตร และ รับบัตร E-ticket</li>
            <li>การใช้ E-ticket เพื่อเข้างาน</li>
            
          </ul>
        </div>
      )
    },
    {
      question: "วิธีการซื้อบัตรคอนเสิร์ต", 
      answer: (
        <div>
          <ul>
            <li>ขั้นตอนการซื้อบัตรใน เว็บไซต์</li>
            <li>ขั้นตอนการซื้อ E - Voucher เว็บไซต์</li>
            
          </ul>
        </div>
      )
    },
    {
      question: "ช่องทางการชำระเงิน", 
      answer: (
        <div>
          <ul>
            <li>ชำระเงินผ่านบัตรเครดิต และบัตรเดบิต</li>
            <li>ชำระเงินผ่าน Prompt Pay (พร้อมเพย์)</li>
            
          </ul>
        </div>
      )
    }
  ];

  // ฟังก์ชันเพื่อเปิดหรือปิดคำถามเมื่อคลิก
  const toggleQuestion = (index) => { 
    // ตรวจสอบว่าคำถามที่คลิกอยู่เป็นคำถามที่เปิดอยู่หรือไม่
    setOpenQuestion(openQuestion === index ? null : index); // ถ้าเปิดอยู่ให้ปิด ถ้าไม่เปิดให้เปิด
  };

  return (
    <div> 
      
      <div className="flex items-center flex-col font-fcfriday mt-20"> 
        <h1 className="text-5xl">คำถามที่พบบ่อย</h1> 
        <h2 className="text-xl text-gray-500 mb-8"> 
          คำถามที่พบบ่อยที่สุดเกี่ยวกับ TicketZone และ การซื้อบัตรคอนเสิร์ตออนไลน์
        </h2>
        {/* คอนเทนเนอร์สำหรับรายการ FAQ */}
        <div className="w-full max-w-4xl"> 
        {/* วนลูปผ่านแต่ละรายการ FAQ  */}
          {faqs.map((faq, index) => ( 
            <div key={index} className="mb-4"> {/* สร้างคอนเทนเนอร์สำหรับแต่ละคำถาม โดยใช้ index เป็น key */}
            {/* ปุ่มสำหรับเปิดหรือปิดการแสดงคำตอบ */}
              <button 
                className="flex justify-between items-center w-full p-4 bg-gray-300 rounded-lg focus:outline-none" 
                onClick={() => toggleQuestion(index)} 
              >
                <span className="text-lg font-bold">{faq.question}</span> {/* แสดงข้อความคำถาม */}
                <span className={`transform transition-transform ${openQuestion === index ? 'rotate-180' : ''}`}>
                  &#9660; {/* ไอคอนลูกศรชี้ลง */}
                </span>
              </button>
              {/* ตรวจสอบว่าคำถามปัจจุบันเปิดอยู่หรือไม่ */}
              {openQuestion === index && ( 
                <div className="p-4 bg-gray-200 rounded-lg"> {/* คอนเทนเนอร์สำหรับคำตอบ */}
                  {faq.answer} {/* แสดงคำตอบที่เป็น JSX โดยตรง */}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <Footer /> 
    </div>
  );
};

export default Help; 
