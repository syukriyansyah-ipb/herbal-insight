"use client";
import clsx from "clsx";
import Image from "next/image";
import Link from "next/link";
import { sidebarItem } from "@/constans";
import { usePathname } from "next/navigation";
import { GiHamburgerMenu } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";
import { RiLogoutBoxFill } from "react-icons/ri";



export default function Template({ children }) {
  const wrapperRef = useRef(null);
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  outsideClick(wrapperRef);
  function outsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShowSidebar(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  useEffect(() => {
    if (window.innerWidth < 640) setIsMobile(true);
  }, []);

  return (
    <div className="bg-gray-100 flex">
      <div
        ref={wrapperRef}
        className={clsx(
          "bg-white min-h-screen max-h-screen transition-all duration-300 z-20 fixed overflow-y-auto no-scrollbar",
          {
            "w-2/3": isMobile && showSidebar,
            "hidden w-0": isMobile && !showSidebar,
            "hidden md:block w-24 hover:w-72": !isMobile,
          }
        )}
      >
        <div className="py-6 px-3">
          <div className="pb-10 flex justify-center items-center">
            <Link href="/">
              <Image src="/assets/images/logo.png" alt="logo" width={100} height={100} className="lg:w-28 sm:w-[90px] md:w-[100px] w-[85px] cursor-pointer" />
            </Link>
          </div>
          <div>
            <ul className="space-y-3">
              {sidebarItem.map((item, index) => (
                <li key={index}>
                  <Link href={item.url}>
                    <div
                      className={clsx(
                        "bg-white py-4 rounded-l-full flex text-gray-700 px-6 overflow-hidden hover:text-green-900 hover:font-semibold",
                        {
                          "bg-gradient-to-r from-green-900 to-green-700 text-white font-semibold hover:text-white shadow-md":
                            pathname === item.url,
                        }
                      )}
                    >
                      <div className="w-5 md:w-6 h-5 md:h-6">
                        <item.Icon className="w-5 md:w-6 h-5 md:h-6" />
                      </div>

                      <h2 className="text-base md:text-lg pl-6 whitespace-nowrap">
                        {item.title}
                      </h2>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute md:pl-24 pl-0 w-full">
        <div className="bg-green-900 bg-opacity-10 w-full py-3 md:py-6 px-3 block md:hidden">
          <GiHamburgerMenu
            className="h-6 w-6 cursor-pointer text-gray-900"
            onClick={() => setShowSidebar(true)}
          />
        </div>
        <div className="p-3 md:p-6 bg-gray-100">{children}</div>
      </div>
    </div>
  );
}
