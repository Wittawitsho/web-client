import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { currentUser } from '../api/auth';
import useWebStore from '../store/web-store';
const Navbar_user = () => {
    const [userName, setUserName] = useState(null); // State to store user's name
    const token = useWebStore((state)=>state.token)
    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        if (token) {
            try {
                const response = await currentUser(token); // Pass the token here
                setUserName(response.data.user); // Set user's name
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
    };
   
    return (
        <div>
            <nav className="bg-white p-3">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <img src="/ticket.png" alt="TicketZone Icon" className="h-8 w-8 mr-2" />
                            <h1 className="text-black font-fcfriday text-3xl">TicketZone</h1>
                        </div>
                        <div className="flex space-x-10 mr-30">
                            <Link to="/" className="text-black font-fcfriday text-xl">หน้าหลัก</Link>
                            <Link to="allconcert" className="text-black font-fcfriday text-xl">คอนเสิร์ต</Link>
                            <Link to="merchandise" className="text-black font-fcfriday text-xl">สินค้า</Link>
                            <Link to="help" className="text-black font-fcfriday text-xl">ช่วยเหลือ</Link>
                        </div>
                        <div className="flex space-x-5 text-xl font-fcfriday">
                            <Link to='/user/profile/'>{userName?.name  || "Loading..."}</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar_user;
