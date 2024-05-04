import React from "react";
import { AiOutlineCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

const WarningModal = ({ isOpen, onCancel, onConfirm }) => {
    return (
        <>
            {isOpen && (
                <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-8 rounded-md shadow-lg">
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-lg font-bold">Confirm Deletion</h2>
                            <button onClick={onCancel}>
                                <AiOutlineCloseCircle className="text-red-500 w-6 h-6" />
                            </button>
                        </div>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete this answer?</p>
                        <div className="flex justify-end">
                            <button className="text-gray-500 mr-4" onClick={onCancel}>
                                Cancel
                            </button>
                            <button className="text-red-500" onClick={onConfirm}>
                                {/* <AiOutlineCheckCircle className="w-5 h-5 mr-1" /> */}
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default WarningModal;
