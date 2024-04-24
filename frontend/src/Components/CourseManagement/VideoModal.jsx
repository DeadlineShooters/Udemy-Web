import React from "react";
import { useState } from "react";
import { IconAlertTriangleFilled, IconAlertCircleFilled, IconX } from '@tabler/icons-react';
import './VideoModal.css'

// fae651 - yellow  fa5151 - red
export default function VideoModal({ showVideoModal, setShowVideoModal, VideoName, VideoSrc }) {
    return (
        <>
        {showVideoModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-hidden fixed inset-0 outline-none focus:outline-none z-99999">
                <div className="relative w-auto my-6">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-between w-full px-5 py-2 border-b border-solid border-blueGray-200 rounded-t">
                            <div className="flex flex-row items-center">
                                <h3 className="text-2xl font-semibold">
                                    {VideoName}
                                </h3>
                            </div>
                            <button onClick={() => setShowVideoModal(false)}>
                                <IconX stroke={2} />
                            </button>
                        </div>
                        <div className="relative p-6 flex-auto">
                            <iframe
                            src={VideoSrc}
                            allow="autoplay; encrypted-media"
                            title="video"
                            className="videodemo w-[960px] h-[540px]"
                            />
                        </div>
                    </div>
                </div>
            </div>
        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
        ) : null}
      </>
    );
}