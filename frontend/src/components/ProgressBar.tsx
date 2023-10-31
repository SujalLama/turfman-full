"use client";

import { useEffect, useRef, useState } from "react";
import {animated, useSpring} from "@/utils/spring";

interface IProgressBar {
    label: string;
    percent: number;
}

export default function ProgressBar({label, percent} : IProgressBar) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [isVisible, setIsVisible] = useState(false);
    const animateCount = useRef(0);

    const targetWidth = percent;

    const animation = useSpring({
        width: isVisible ? targetWidth : 0,
        config: { duration: 2000 }, // Adjust duration as needed
      });

  useEffect(() => {
    const div = divRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if(entry.isIntersecting && animateCount.current === 0) {
            setIsVisible(animateCount.current === 0);
            animateCount.current = 1;
        }
        
      },
      { threshold: 0.5 }
    );

    if(div) {
      observer.observe(div);
    }
    
    return () => {
      if (div) {
        observer.unobserve(div);
      }
    };
  }, [divRef, animateCount]);

      
    
  return (
    <div className="pb-8">
        <div className="flex justify-between mb-2">
            <span className="font-bold text-[15px]">{label}</span>
            <span className="font-bold text-[15px] text-gray-darker">{percent}%</span>
        </div>
        <div className="relative" ref={divRef}>
            {/* <!--Background line--> */}
            <div className="absolute top-0 h-[7px] w-full bg-black/10"></div>
            {/* <!--Front line--> */}
            <animated.div className="absolute top-0 h-[7px] bg-primary after:content-[''] 
                after:block after:absolute after:-top-[4px] after:right-0 after:border-[3px] 
                after:border-primary after:w-3.5 after:h-3.5 after:rounded-full after:bg-white" 
                style={{width: animation.width.to((val) => `${val}%`)}}></animated.div>
            {/* <!--Pointer--> */}
            
        </div>
    </div>
  )
}
