import React from 'react';


const AddInfo = () => {
    return (
        <div>
    <div className="flex items-center justify-center">
    <div className="mt-8 bg-gray-300 rounded-lg">
                <h1 className="text-2xl px-4 py-4">ข้อมูลพื้นฐาน</h1>
                    <div className="grid grid-cols-4 ">
                        <div className="col-span-1 flex flex-col items-center">
                        <img src="/icon_facebook.png" alt="Profile icon" className="h-32 w-32 rounded-full" />
                        <button className="bg-blue-500 text-white mt-4 rounded-lg p-2 w-1/2">แก้ไขรูปภาพ</button>
                        </div>
                        <div className="col-span-3">
                            <div className="flex text-xl mb-2">
                                <h2 className="ml-20">ชื่อ</h2>
                                <div className="w-full bg-gray-300 border border-gray-400 px-2 mr-8 ml-4 rounded-lg">
                                    <p>Wittawit</p>
                                </div>
                            </div>
                            <div className="flex text-xl mb-2">
                                <h2 className="ml-10">นามสกุล</h2>
                                <div className="w-full bg-gray-300 border border-gray-400 px-2 mr-8 ml-4 rounded-lg">
                                    <p>Mokthong</p>
                                </div>
                            </div>
                            <div className="flex text-xl mb-2">
                                <h2 className="whitespace-nowrap ml-2">เบอร์โทรศัพท์</h2>
                                <div className="w-full bg-gray-300 border border-gray-400 px-2 mr-8 ml-4 rounded-lg">
                                    <p>098-269-xxxx</p>
                                </div>
                            </div>
                            <div className="flex text-xl mb-2">
                                <h2 className="ml-16">อีเมล</h2>
                                <div className="w-full bg-gray-300 border border-gray-400 px-2 mr-8 ml-4 rounded-lg">
                                    <p>wittawitsho@gmail.com</p>
                                </div>
                            </div>
                            <div className="flex justify-end mr-8 mb-10">
                                <button className="bg-blue-500 text-white px-6 py-1 rounded-lg mr-4">
                                แก้ไข
                                </button>
                                <button className="bg-blue-500 text-white px-6 py-1 rounded-lg">
                                บันทึก
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
    
  
    );
};

export default AddInfo;
