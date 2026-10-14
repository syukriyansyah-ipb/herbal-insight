"use client";
import { useEffect, useRef } from "react";

export default function ClickOutside({ children, setShow, show, styles}) {
  const wrapperRef = useRef(null);
  outsideClick(wrapperRef);
  function outsideClick(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setShow(show);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return <div ref={wrapperRef} className={styles}>{children}</div>;
}
