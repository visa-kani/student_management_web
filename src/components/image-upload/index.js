import React, { useState, useEffect } from 'react';
import Preview from "../../assets/images/defalut.png";
import { RiEditLine } from "react-icons/ri";
import { MdOutlineDelete } from "react-icons/md";

function ImageUpload({ setFormData, existingImage }) {
    const [preview, setPreview] = useState(Preview); // default image URL
    const [base64, setBase64] = useState('');

    useEffect(() => {
        if (existingImage) {
            setPreview(`http://localhost:7001/${existingImage}`);
        }
    }, [existingImage]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
                setBase64(reader.result.split(',')[1]); // get only base64 data without prefix
            };
            reader.readAsDataURL(file);
            setFormData(file); // store the actual file object

        }
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <label htmlFor="fileInput">
                <img
                    src={preview}
                    alt="Preview"
                    className="w-[120px] h-[120px] object-cover rounded cursor-pointer"
                />
            </label>
            <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
                id="fileInput"
            />
            {base64 || existingImage ? <div className='relative'>
                <div className='absolute -right-[90px] -top-14'>
                    <label htmlFor="fileInput">
                        <RiEditLine className=' text-lg text-[#047bba] cursor-pointer' />
                    </label>
                    <MdOutlineDelete className='text-lg text-[#ff2828] mt-2 cursor-pointer' onClick={() => { setPreview(Preview); setBase64(''); setFormData(''); }} />
                </div>
            </div> : null}

        </div>
    );
}

export default ImageUpload;
