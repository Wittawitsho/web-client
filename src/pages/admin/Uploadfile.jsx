import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Resize from 'react-image-file-resizer';
import { removePoster, uploadPoster } from '../../api/Concert';
import useWebStore from '../../store/web-store';

const Uploadfile = ({ form, setForm }) => {
    const token = useWebStore((state) => state.token);
    const [isLoading, setIsLoading] = useState(false);

    const handleOnChange = (e) => {
        setIsLoading(true);
        const files = e.target.files;
        if (files) {
            let allFiles = form.images || [];
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                if (!file.type.startsWith('image/')) {
                    toast.error(`File ${file.name} บ่แม่นรูป`);
                    continue;
                }

                Resize.imageFileResizer(
                    file,
                    720,
                    720,
                    "JPEG",
                    100,
                    0,
                    (data) => {
                        uploadPoster(token, data)
                            .then((res) => {
                                allFiles.push({
                                    asset_id: res.data.asset_id,
                                    public_id: res.data.public_id,
                                    url: res.data.url,
                                    secure_url: res.data.secure_url
                                });
                                setForm({
                                    ...form,
                                    images: allFiles
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

    const handleDelete = (public_id) => {
        const images = form.images || [];
        removePoster(token, public_id)
            .then((res) => {
                const filterImages = images.filter((item) => item.public_id !== public_id);
                setForm({
                    ...form,
                    images: filterImages
                });
                toast.error(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <div>
            <div>
                {Array.isArray(form.images) && form.images.map((item, index) => (
                    <div key={index} className="relative">
                        <img className="w-80 h-96" src={item.url} alt={item.public_id} />
                        <span 
                            onClick={() => handleDelete(item.public_id)}
                            className="absolute top-0 right-0 bg-red-500 p-1 rounded-full cursor-pointer">X</span>
                    </div>
                ))}
            </div>
            <div>
                <input
                    onChange={handleOnChange}
                    type="file"
                    name='file'
                    accept="image/*"
                    multiple
                    className="bg-gray-200 w-full p-2"
                />
            </div>
        </div>
    );
};

export default Uploadfile;
