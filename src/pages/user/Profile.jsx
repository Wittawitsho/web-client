import React, { useEffect, useState } from 'react';
import useWebStore from '../../store/web-store';
import { currentUser } from '../../api/auth';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import UploadProfilePicture from './UploadProfilePicture';


const Profile = () => {
    const actionLogout = useWebStore((state) => state.actionLogout);
    const [form, setForm] = useState(null);
    const token = useWebStore((state) => state.token);
    const [showUploadPopup, setShowUploadPopup] = useState(false); // State to control popup visibility

    useEffect(() => {
        fetchUser();
    }, []);

    const fetchUser = async () => {
        if (token) {
            try {
                const response = await currentUser(token);
                console.log("User data:", response);
                setForm(response.data.user);
            } catch (error) {
                console.error("Error fetching user:", error);
            }
        }
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        
      };
    return (
        <div className="min-h-screen flex flex-col">
            <h1 className="text-3xl ml-32 mt-8 font-fcfriday">บัญชีของฉัน</h1>
            <div className="grid grid-cols-8 mr-32 font-fcfriday flex-grow flex">
                <div className="col-span-2">
                    <Sidebar />
                </div>
                <div className="ml-20 mt-8 bg-gray-300 col-span-6 rounded-lg">
                    <h1 className="text-2xl px-4 py-4">ข้อมูลพื้นฐาน</h1>
                    <div className="grid grid-cols-4 ">
                        <div className="col-span-1 flex flex-col items-center">
                            <img src="/icon_facebook.png" alt="Profile icon" className="h-32 w-32 rounded-full" />
                            <button
                                className="bg-blue-500 text-white mt-4 rounded-lg p-2 w-1/2"
                                onClick={() => setShowUploadPopup(true)} // Open popup
                            >
                                แก้ไขรูปภาพ
                            </button>
                        </div>
                        <div className="col-span-3">
                            <div className="flex text-xl mb-2">
                                <h2 className="ml-20">ชื่อ</h2>
                                <div className="w-full bg-gray-300 border border-gray-400 px-2 mr-8 ml-4 rounded-lg">
                                    <p>{form?.name || 'ชื่อคอนเสิร์ต'}</p>
                                </div>
                            </div>
                            <div className="flex text-xl mb-2">
                                <h2 className="ml-10">นามสกุล</h2>
                                <div className="w-full bg-gray-300 border border-gray-400 px-2 mr-8 ml-4 rounded-lg">
                                    <p>{form?.lastname || 'ชื่อคอนเสิร์ต'}</p>
                                </div>
                            </div>
                            <div className="flex text-xl mb-2">
                                <h2 className="whitespace-nowrap ml-2">เบอร์โทรศัพท์</h2>
                                <div className="w-full bg-gray-300 border border-gray-400 px-2 mr-8 ml-4 rounded-lg">
                                    <p>{form?.tel || 'ชื่อคอนเสิร์ต'}</p>
                                </div>
                            </div>
                            <div className="flex text-xl mb-2">
                                <h2 className="ml-16">อีเมล</h2>
                                <div className="w-full bg-gray-300 border border-gray-400 px-2 mr-8 ml-4 rounded-lg">
                                    <p>{form?.email || 'ชื่อคอนเสิร์ต'}</p>
                                </div>
                            </div>
                            <div className="flex justify-end mr-8 mb-10">
                                <button className="bg-blue-500 text-white px-6 py-1 rounded-lg mr-4">แก้ไข</button>
                                <button className="bg-blue-500 text-white px-6 py-1 rounded-lg">บันทึก</button>
                                <button onClick={actionLogout} className="text-black font-fcfriday text-xl">Log Out</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showUploadPopup && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg">
                        <UploadProfilePicture form={form} setForm={setForm} />
                        <div className='flex justify-between'>
                        <button
                            className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
                            onClick={() => setShowUploadPopup(false)} // Close popup
                        >
                            ปิด
                        </button>
                        <button
                            className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg"
                            onSubmit={handleSubmit}
                            onClick={() => setShowUploadPopup(false)} // Close popup
                        >
                            บันทึก
                        </button>
                        </div>
                    </div>
                </div>
            )}

            <Footer />
        </div>
    );
};

export default Profile;
