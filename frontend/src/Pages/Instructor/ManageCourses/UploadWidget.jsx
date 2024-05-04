import React, {useEffect, useRef} from 'react'
import { IconUpload } from '@tabler/icons-react';
import { MdCloudUpload, MdDelete} from 'react-icons/md'
import { AiFillFileImage } from 'react-icons/ai'

const UploadWidget = ({onUpload, type, object}) => {
    const cloudinaryRef = useRef();
    const widgetRef = useRef();
    useEffect(() => {
        cloudinaryRef.current = window.cloudinary;
        widgetRef.current = cloudinaryRef.current.createUploadWidget({
            cloudName: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME,
            uploadPreset: process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET,
            crop: true
        }, function(error, result) {
            if ((error || result.event === 'success') && typeof onUpload === 'function') {
                onUpload(error, result, widgetRef, type);
            }
        })
    }, [])
    return (
        <div>
            <button 
                className='flex p-2 bg-black rounded-md mb-2'
                onClick={() => widgetRef.current.open()}>
                <IconUpload color='white' stroke={2}/>
                {(object==="video") && <p className='text-white font-bold'>Upload your video</p>}
                {(object==="image") && <p className='text-white font-bold'>Upload your image</p>}
            </button>
        </div>
    )
}

export default UploadWidget