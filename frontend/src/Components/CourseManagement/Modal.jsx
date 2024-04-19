import React from "react";
import { useState } from "react";
import { IconAlertTriangleFilled, IconAlertCircleFilled, IconX } from '@tabler/icons-react';

// fae651 - yellow  fa5151 - red
export default function Modal({showModal, setShowModal, title, type, description, handle, action}) {
    return (
    <>
        {showModal ? (
        <>
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none z-99999">
                <div className="relative w-auto my-6 mx-auto max-w-md">
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-center justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                            <div className="flex flex-row items-center">
                                {(type ==="alert") && <IconAlertCircleFilled color="#fa5151" className="mr-2"/>}
                                {(type ==="warning") && <IconAlertTriangleFilled color="#fae651" className="mr-2"/>}
                                <h3 className="text-2xl font-semibold">
                                    {title}
                                </h3>
                            </div>
                            <button onClick={() => setShowModal(false)}>
                                <IconX stroke={2} />
                            </button>
                        </div>
                        {/*body*/}
                        <div className="relative p-6 flex-auto">
                            <p className="my-4 text-blueGray-500 text-md leading-relaxed line-clamp-2">
                                {description}
                            </p>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                            <button
                                className="text-blue-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => setShowModal(false)}>
                                Cancel
                            </button>
                            <button
                                className="bg-[#fa5151] text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                type="button"
                                onClick={() => handle()}>
                                {action}
                            </button>
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