"use client";

import { PropsWithChildren, useEffect, useRef, useState } from "react";

export default function MainHeaderScroll({children}: PropsWithChildren) {
    const [scrollActive, setScrollActive] = useState(false);
    const headerTop = useRef(0);
  
    useEffect(() => {
      const container = document.querySelector('#containerHeader') as HTMLDivElement;
      if(container?.offsetTop) {
        headerTop.current = container.offsetTop
      }
    }, [])
  
    useEffect(() => {
      
      if(!headerTop.current) {
        return;
      }
  
      function scrollHandler () {
        if(window.scrollY > headerTop.current) {
          setScrollActive(true)
        } else {
          setScrollActive(false)
        }
      }
  
      window.addEventListener('scroll', scrollHandler);
  
      return () => window.removeEventListener('scroll', scrollHandler);
      
      
    }, []);
  
  return (
    <div id="containerHeader" className="sticky top-0 left-0 right-0 z-50 hidden xl:block">
        <div className="mx-auto px-3.5 max-w-full sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px] xl:max-w-[1200px]">
            <div className={`bg-primary h-[68px] text-white 
                font-display text-sm leading-[68px] font-medium tracking-[0.5px]
                uppercase rounded-[3px] ${scrollActive ? ' shadow-2xl' : ''}
                `}>
                    {
                        children
                    }
            </div>
        </div>
    </div>
  )
}
