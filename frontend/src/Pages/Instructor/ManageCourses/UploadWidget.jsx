import React, {useEffect, useRef} from 'react'
import { IconUpload } from '@tabler/icons-react';
import { MdCloudUpload, MdDelete} from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

const UploadWidget = ({onUpload}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
        }, function(error, result) {
            if ((error || result.event === 'success') && typeof onUpload === 'function') {
                onUpload(error, result, widgetRef);
            }
        })
    }, [])
    return (
        <div>
            <button 
                className='flex p-2 bg-black rounded-md mb-2'
                onClick={() => widgetRef.current.open()}>
                <IconUpload color='white' stroke={2}/>
                <p className='text-white font-bold'>Upload your video</p>
            </button>
        </div>
    )
}

export default UploadWidget