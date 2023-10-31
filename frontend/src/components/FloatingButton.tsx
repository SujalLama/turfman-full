"use client";

import Link from "next/link";
import FaIcons from "./FaIcons";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function FloatingButton() {
    const [scrollActive, setScrollActive] = useState(false);
    const path = usePathname();

  useEffect(() => {

    function scrollHandler () {
      if(window.scrollY > 250) {
        setScrollActive(true)
      } else {
        setScrollActive(false)
      }
    }

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
    
    
  }, []);

  function scrollToTop () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }
  return (
    <button 
        onClick={scrollToTop} 
        className={` z-40 fixed bottom-7.5 right-5 text-base 
            leading-[45px] rounded-full w-[45px] h-[45px] text-white bg-primary 
            text-center border-[3px] border-[#eee] ${scrollActive ? 'visible' : 'invisible'}`}>
        <FaIcons icon="faChevronUp" />
    </button>
  )
}
