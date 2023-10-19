"use client";

import Link from "next/link";
import FaIcons from "./FaIcons";
import { useEffect, useState } from "react";

export default function FloatingButton({link}: {link: string;}) {
    const [scrollActive, setScrollActive] = useState(false);

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
  return (
    <Link 
        href={link} 
        className={` z-40 fixed bottom-7.5 right-5 text-base 
            leading-[45px] rounded-full w-[45px] h-[45px] text-white bg-primary 
            text-center border-[3px] border-[#eee] ${scrollActive ? 'visible' : 'invisible'}`}>
        <FaIcons icon="faChevronUp" />
    </Link>
  )
}
