import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { getOrders, getGroupOrders } from '../../api/user';
import useWebStore from '../../store/web-store';
import { useNavigate } from 'react-router-dom';
const My_Ticket = () => {
    const navigate = useNavigate();
    const[orders, setOrders] = useState([])
    const token = useWebStore((s)=>s.token)
    useEffect(()=>{
        hdlGetOrders(token)
    },[])

    const hdlGetOrders = (token)=>{
        getGroupOrders(token)
        .then((res)=>{
            console.log(res)
            setOrders(res.data.orders)
        })
        .catch((err)=>{
            console.log(err)
        })
    }
    return (
        <div className="min-h-screen flex flex-col">
            <h1 className="text-3xl ml-32 mt-8 font-fcfriday">บัญชีของฉัน</h1>
            <div className="grid grid-cols-8 mr-32 font-fcfriday ">
                <div className="col-span-2">
                    <Sidebar />
                </div>
                <div className="ml-20 mt-8 bg-gray-300 col-span-6 rounded-lg">
                    {orders?.map((order, index) => (
                        <div key={index}>
                            <div className="grid grid-cols-4">
                                <div className="col-span-1 px-4 py-4">
                                    <img src={order.tickets[0]?.ticket.concert.images[0]?.url || '/bg.jpg'} alt="Profile icon" className="h-64 w-full rounded-lg" />
                                </div>
                                <div className="col-span-3">
                                    <div className="flex flex-col">
                                        <h2 className="mt-2 text-2xl"> {order.tickets[0]?.ticket.concert?.name || 'Concert Name Not Available'}</h2>
                                        <div className="flex space-x-1">
                                            <img src="/calendar.png" alt="calendar" className="w-4 h-4 mt-1" />
                                            <p className="text-lg">{order.tickets[0]?.ticket.concert?.date || 'Concert Date Not Available'}</p>
                                        </div>
                                        <div className="flex space-x-1">
                                            <img src="/clock.png" alt="clock" className="w-4 h-4 mt-2" />
                                            <p className="text-lg">{order.tickets[0]?.ticket.concert?.time || 'Concert Time Not Available'}</p>
                                        </div>
                                        <div className="flex space-x-1">
                                            <img src="/location.png" alt="location" className="w-4 h-4 mt-2" />
                                            <p className="text-lg">{order.tickets[0]?.ticket.concert?.location || 'Concert Location Not Available'}</p>
                                        </div>
                                        <hr className="border-1 border-dashed border-black mt-2" />
                                        <div className="text-lg mt-28 flex items-center space-x-2">
                                            <h3 className="mt-3">{order.totalTickets} ใบ</h3>
                                            <button 
                                            onClick={() => navigate(`/user/ticketdetails/${order.id}`)}
                                            className="mb-2 text-white bg-blue-500 px-4 py-1 rounded-lg">ดูรายละเอียดบัตร</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <hr className="ml-2 mr-2 border-1 border-dashed border-black mt-2" />
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default My_Ticket;
