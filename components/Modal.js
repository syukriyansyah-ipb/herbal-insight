"use client";
import { useEffect } from "react";
import { IoIosCloseCircle } from "react-icons/io";

export default function Modal({ children, closeModal, showModal }) {
  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [showModal]);

  return (
    showModal && (
      <div className="h-screen w-screen bg-black bg-opacity-60 fixed inset-0 z-30 flex justify-center items-start md:items-center">
        <div className="bg-white rounded-xl md:w-1/2 w-full max-h-full relative overflow-y-auto m-3 md:m-10">
          <div className="absolute right-0 m-1 sm:m-2">
            <IoIosCloseCircle
              className="text-xl sm:text-2xl text-red-700 hover:text-red-600 transition-colors duration-300 cursor-pointer"
              onClick={closeModal}
            />
          </div>
          <div className="p-8 md:p-10">{children}</div>
        </div>
      </div>
    )
  );
}
