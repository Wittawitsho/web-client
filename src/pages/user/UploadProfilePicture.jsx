import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
import { removeProfile, uploadProfile } from '../../api/user';
import useWebStore from '../../store/web-store';

const UploadProfilePicture = ({ form, setForm }) => {
    const token = useWebStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        setIsLoading(true);
        const files = e.target.files;
        if (files) {
            let allFiles = form.ImageProfile || [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} บ่แม่นรูป`);
                    continue;
                }

                Resize.imageFileResizer(
                    file,
                    300,
                    300,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        uploadProfile(token, data)
                            .then((res) => {
                                allFiles.push({
                                    asset_id: res.data.asset_id,
                                    public_id: res.data.public_id,
                                    url: res.data.url,
                                    secure_url: res.data.secure_url
                                });
                                setForm({
                                    ...form,
                                    ImageProfile: allFiles
                                });
                                setIsLoading(false);
                                toast.success('Upload image Success!!!');
                            })
                            .catch((err) => {
                                console.log(err);
                                setIsLoading(false);
                                toast.error('การอัพโหลดรูปภาพล้มเหลว');
                            });
                    },
                    "base64"
                );
            }
        }
    };

    const handleDelete = () => {
        const { public_id } = form.ImageProfile;
        if (!public_id) return;

        removeProfile(token, public_id)
            .then((res) => {
                setForm({
                    ...form,
                    ImageProfile: null
                });
                toast.success('ลบรูปโปรไฟล์สำเร็จ');
            })
            .catch((err) => {
                console.log(err);
                toast.error('การลบรูปโปรไฟล์ล้มเหลว');
            });
    };

    return (
        <div>
            <div className="flex flex-col items-center">
                {form.profilePicture ? (
                    <div className="relative">
                        <img className="w-40 h-40 rounded-full" src={form.profilePicture.url} alt="Profile" />
                        <span
                            onClick={handleDelete}
                            className="absolute top-0 right-0 bg-red-500 p-1 rounded-full cursor-pointer">X</span>
                    </div>
                ) : (
                    <p>ยังไม่มีรูปโปรไฟล์</p>
                )}
            </div>
            <div className="mt-4">
                <input
                    onChange={handleOnChange}
                    type="file"
                    name="profilePicture"
                    accept="image/*"
                    className="bg-gray-200 w-full p-2"
                />
            </div>
        </div>
    );
};

export default UploadProfilePicture;
