"use client";
import Image from "next/image";
import { useEffect } from "react";
import { ClickOutside } from "@/components";
import { IoIosCloseCircle } from "react-icons/io";

export default function ViewImage({ closeModal, showModal, cover }) {
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
      <div className="h-screen w-screen bg-black bg-opacity-90 fixed inset-0 z-30 flex justify-center items-center">
        <ClickOutside setShow={closeModal} show={showModal}>
          <div className="relative p-3">
            <Image
              src={cover}
              alt="medicinal plant"
              priority
              width={400}
              height={600}
              className="object-cover"
            />
            <div className="absolute right-0 top-0">
              <IoIosCloseCircle
                className="text-white text-xl sm:text-2xl transition-colors duration-300 cursor-pointer md:translate-x-4 md:-translate-y-4 translate-x-0 -translate-y-0"
                onClick={closeModal}
              />
            </div>
          </div>
        </ClickOutside>
      </div>
    )
  );
}
