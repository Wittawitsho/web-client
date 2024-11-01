import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getOrders } from '../../api/user';
import { currentUser } from '../../api/auth';
import useWebStore from '../../store/web-store';
import React from 'react';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import { useNavigate } from 'react-router-dom';

const E_Ticket = () => {
    const { orderId, ticketId } = useParams(); // Capture "orderId" and "ticketId" parameters
    const navigate = useNavigate();
    const token = useWebStore((state) => state.token);
    const [ticket, setTicket] = useState(null); // Single ticket state
    const [form, setForm] = useState(null); // State to store user's name
    useEffect(() => {
        if (token && orderId) {
            hdlGetTicket(token, orderId);
            fetchUser();
        }
    }, [token, orderId]);
    const fetchUser = async () => {
        if (token) {
            try {
                const response = await currentUser(token); // Pass the token here
                console.log("User data:", response);
                setForm(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
    };
    const hdlGetTicket = (token, orderId) => {
        getOrders(token, orderId)
            .then((res) => {
                const tickets = res.data.orders?.tickets || [];
                const foundTicket = tickets.find((t) => t.id === parseInt(ticketId));
                setTicket(foundTicket || null); // Set the specific ticket or null if not found
            })
            .catch((err) => {
                console.log("Order Details Error:", err);
            });
    };

    return (
        <div>
            <div className="mt-14 ml-32 mr-32">
                <h1 className="font-fcfriday text-2xl mb-5" onClick={() => navigate(-1)}>{'<'} ย้อนกลับ</h1>
                <div className="bg-gray-300 w-full h-[75vh] relative flex flex-col items-center ">
                    <img 
                        src="/Profile.jpg" 
                        alt="Profile"
                        className="absolute -top-16 rounded-full w-32 h-32" 
                    />
                    <div className="font-fcfriday mt-20 flex flex-col items-center ">
                        <h2 className="text-2xl">{form?.name || 'ชื่อคอนเสิร์ต'} {form?.lastname || 'ชื่อคอนเสิร์ต'}</h2>
                        {ticket ? (
                            <>
                                <h1 className="text-3xl">{ticket.ticket?.concert?.name || "Concert name not available"}</h1>
                                <p className="text-xl">{new Date(ticket.ticket?.concert?.date).toLocaleDateString() || 'ชื่อคอนเสิร์ต'} {ticket.ticket?.concert?.time}</p>
                                <p className="text-xl">{ticket.ticket?.concert?.location || 'ชื่อคอนเสิร์ต'}</p>
                                <p className="text-xl">
                                    ID: {ticket?.id || 'ชื่อคอนเสิร์ต'} {ticket.ticket?.title || "Pre - Sale"}
                                    ราคา: {ticket?.price || 'ชื่อคอนเสิร์ต'} บาท
                                </p>
                            </>
                        ) : (
                            <p className="text-xl">Ticket not found or loading...</p>
                        )}
                        <img 
                            src="/QR Code.png" 
                            alt="QR Code"
                            className="w-64 h-64 mt-5" 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default E_Ticket;
