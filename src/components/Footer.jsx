import React from 'react';

const Footer = () => {
  return (
    // Footer section
    <footer className="bg-gray-400 w-full h-auto text-black py-6 mt-10 bottom-0">
      
      {/* Website name on the left side */}
      <div className="text-2xl font-fcfriday ml-36 mb-3">
        TicketZone Web Application
      </div>

      {/* Main topics and sub-topics */}
      <div className="flex justify-start space-x-40">

        {/* "ติดตามเรา" (Follow Us) section */}
        <div className="text-xl font-fcfriday ml-36 mr-36">
          <h2 className="mb-1">ติดตามเรา</h2>
          <ul className="flex space-x-1"> {/* ใช้ flex เพื่อให้รูปเรียงกัน */}
            <li>
              <img src="/icon_facebook.png" alt="Facebook" className="w-8 h-8" />
            </li>
            <li>
              <img src="/icon_ig.png" alt="IG" className="w-8 h-8" />
            </li>
          </ul>
        </div>

        {/* "รายการหลัก" (Main Menu) section */}
        <div className="text-xl font-fcfriday ">
          <h2 className="text-2xl mb-1">รายการหลัก</h2>
          <ul>
            <li>คอนเสิร์ตทั้งหมด</li>
            <li>สินค้าทั้งหมด</li>
            <li>ช่วยเหลือ</li>
          </ul>
        </div>

        {/* "ต้องการความช่วยเหลือ" (Need Help) section */}
        <div className="text-xl font-fcfriday ">
          <h2 className="text-2xl mb-1">ต้องการความช่วยเหลือ</h2>
          <ul>
            <li>วิธีการซื้อบัตร</li>
            <li>วิธีการชำระเงิน</li>
            <li>วิธีการส่งต่อบัตร</li>
          </ul>
        </div>

        {/* "ฝ่ายลูกค้าสัมพันธ์" (Customer Support) section */}
        <div className="text-xl font-fcfriday ">
          <h2 className="text-2xl mb-1">ฝ่ายลูกค้าสัมพันธ์</h2>
          <ul>
          <ul className="flex space-x-1"> {/* ใช้ flex เพื่อให้รูปเรียงกัน */}
            <li>
              <img src="/mail.png" alt="Mail" className="w-6 h-6" />
            </li>
            <li>ticketzone888@gmail.com</li>
            </ul>
            <ul className="flex space-x-1"> {/* ใช้ flex เพื่อให้รูปเรียงกัน */}
            <li>
            <img src="/icon_facebook.png" alt="Facebook" className="w-6 h-6" />
            </li>
            <li>TicketZone</li>
            </ul>
            <ul className="flex space-x-1"> {/* ใช้ flex เพื่อให้รูปเรียงกัน */}
            <li>
              <img src="/call.png" alt="Call" className="w-6 h-6" />
            </li>
            <li>02-222-xxxx</li>
            </ul>
            
          </ul>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
