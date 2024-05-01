import React from 'react'
import { getColor, createImageFromInitials } from '../Utils/Utils';

const CompQA = () => {
    return (
        <div>
            <hr className="border-[0.5px] border-gray-300"/>
            <div className="flex flex-col">
                <div className="flex flex-row">
                    <p className="text-[#3d07bb] mr-2">Nguyen Minh Thong</p>
                    <p className="mr-2">2 days ago</p>
                </div>
                <div className="flex flex-col">
                    <p className="font-bold line-clamp-2 leading-tight">2</p>
                    <p>1</p>
                </div>
            </div>
        </div>
    )
}

export default CompQA