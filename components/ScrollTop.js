"use client";
import { useEffect, useState } from "react";
import { IoArrowUp } from "react-icons/io5";
import { animateScroll as scroll } from "react-scroll";

export default function ScrollTop() {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const scrollToTop = () => {
    scroll.scrollToTop();
  };

  return (
    isScrolled && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-0 right-0 rounded-full -translate-x-8 md:-translate-x-20 -translate-y-8 md:-translate-y-16 w-14 h-14 sm:w-16 sm:h-16 bg-green-700 bg-opacity-70 hover:bg-opacity-100 transition-all duration-300 flex justify-center items-center shadow-md"
      >
        <IoArrowUp className="text-white font-bold text-2xl sm:text-3xl" />
      </button>
    )
  );
}
