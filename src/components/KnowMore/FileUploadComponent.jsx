import React, { useState } from 'react';
import axios from 'axios';
import { FaUpload } from 'react-icons/fa';

const FileUploadComponent = ({ onFileUpload }) => {
    const [file, setFile] = useState(null);

    const handleFileUpload = async () => {
        try {
            if (!file) {
                console.error('No file selected.');
                return;
            }

            const formData = new FormData();
            formData.append('resume', file);
            console.log(formData['resume']);
            // Assuming you have an endpoint for file upload in your Flask server
            const response = await axios.post('http://127.0.0.1:5000/upload_resume', formData);

            // Handle the response, trigger scanning, etc.
            console.log(response.data);

            // Reset the file state after successful upload
            setFile(null);

            // Pass the uploaded file information to the parent component
            onFileUpload(response.data);
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <>
            <div className='text-center '>
                <div className='px-2 text-lg font-semibold'> Upload Resume <br /> </div>

                <div className='px-2 text-sm '>Sccan</div>
            </div>
            <div className='flex m-2  p-4 cursor-pointer bg-white border border-gray-300 rounded-lg shadow-md'>

                <label htmlFor='fileInput' className='w-[100%] cursor-pointer'>
                    <input
                        id='fileInput'
                        type='file'
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <FaUpload className='text-green-500 text-2xl' />
                    <p className='ml-2 text-gray-600'>Choose a file</p>
                </label>

                <div className='flex justify-center'>
                    <button onClick={handleFileUpload} className='bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600'>
                        Upload
                    </button>
                </div>
            </div>
        </>
    );
};

export default FileUploadComponent;
