import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrders } from '../../api/user';
import useWebStore from '../../store/web-store';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';
const Ticket_Details = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const token = useWebStore((state) => state.token);
    const [orders, setOrders] = useState({}); // Initialize as an object
    console.log("Calling hdlGetTicket with:", id); 
    useEffect(() => {
        if (token && id) {
            console.log("Calling hdlGetTicket with:", id); // Debug log
            hdlGetTicket(token, id);
        }
    }, [token, id]);
    

    const hdlGetTicket = (token, id) => {
        console.log("Order ID:", id); // Debug log
        getOrders(token, id)
        .then((res) => {
            console.log("Order Details Response:", res);
            setOrders(res.data.orders);
        })
        .catch((err) => {
            console.log("Order Details Error:", err);
        });
    };
    
    
    
     

    return (
        <div className="min-h-screen flex flex-col">
            
            <h1 className="text-3xl ml-32 mt-8 font-fcfriday">บัญชีของฉัน</h1>
            <div className="grid grid-cols-8 mr-32 font-fcfriday ">
                <div className="col-span-2">
                    <Sidebar />
                </div>
                <div className="ml-20 mt-8 bg-gray-300 col-span-6 rounded-lg">
                <h1 className="text-2xl px-4 mt-4">{'<'}  บัตรทั้งหมด</h1>
                    <div className="grid grid-cols-4 ">
                        <div className="col-span-1 px-4 py-4">
                            <img src="/bg.jpg" alt="Profile icon" className="h-64 w-full rounded-lg" />
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col">
                                <h2 className="mt-2 text-2xl">{orders?.tickets?.[0]?.ticket?.concert?.name || "Concert name not available"}</h2>
                                <div className="flex space-x-1">
                                    <img src="/calendar.png" alt="calendar" className="w-4 h-4 mt-1" />
                                    <p className="text-lg">{new Date(orders?.tickets?.[0]?.ticket?.concert?.date).toLocaleDateString()}</p>
                                </div>
                                <div className="flex space-x-1">
                                    <img src="/clock.png" alt="clock" className="w-4 h-4 mt-2" />
                                    <p className="text-lg">{orders?.tickets?.[0]?.ticket?.concert?.time}</p>
                                </div>
                                <div className="flex space-x-1">
                                    <img src="/location.png" alt="location" className="w-4 h-4 mt-2" />
                                    <p className="text-lg">{orders?.tickets?.[0]?.ticket?.concert?.location}</p>
                                </div>
                                <hr className="border-1 border-dashed border-black mt-2" />
                                <h3 className="mt-28">จำนวนบัตร : {orders?.tickets?.length} ใบ</h3>
                            </div>
                        </div>
                    </div>
                    {orders?.tickets?.map((ticket, index) => (
        <div key={index}>
            <div className="flex justify-between text-xl ml-4 py-2">
                <p>{ticket.ticket?.title || "Pre - Sale"}</p>
                <p>{ticket?.count || 1} ใบ</p>
            </div>
            <hr className="ml-4 mr-4 border-1 border-black mb-4" />

            </div>
    ))}


      {orders?.tickets?.map((ticket, index) => (
        <div key={index}>
            <div className="flex justify-between bg-gray-500 rounded-lg ml-4 mr-4 px-4 py-2">
                <div className="text-white text-lg">
                    <p>ID : {ticket?.id}</p>
                    <p>{ticket.ticket?.title || "Pre - Sale"}</p>
                    <p>ราคา : {ticket?.price} บาท</p>
                </div>
                <div className="flex flex-col items-center mr-4">
                    <img src="/Mini QR Code.png" alt="Mini QR Code" className="h-28 w-28" />
                    <button 
                    onClick={() => navigate(`/user/eticket/${orders.id}/${ticket?.id}`)}
                    className="bg-blue-500 text-white rounded-lg px-4 mt-2">แสดง QR Code</button>
                </div>
            </div>
        </div>
    ))}
</div>
                
            </div>
            
            <Footer />
        </div>
    );
};

export default Ticket_Details;
