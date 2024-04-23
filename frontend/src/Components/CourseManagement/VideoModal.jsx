import React from "react";
import { useState } from "react";
import { IconAlertTriangleFilled, IconAlertCircleFilled, IconX } from '@tabler/icons-react';

// fae651 - yellow  fa5151 - red
export default function VideoModal({showVideoModal, setShowVideoModal, VideoSrc}) {
    return (
    <>
        {showVideoModal ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none z-99999">
                <div className="relative w-auto my-6 mx-auto max-w-md">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <iframe src={VideoSrc} allow="autoplay; encrypted-media" title="video"/>
                    </div>
                </div>
            </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}
    </>
    );
}