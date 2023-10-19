"use client";

import useIsVisible from "@/hooks/useIsVisible";
import { useEffect, useRef, useState } from "react";
import {animated, useSpring} from "@react-spring/web";

interface IProgressBar {
    label: string;
    percent: number;
}
export default function ProgressBar({label, percent} : IProgressBar) {
    const divRef = useRef<HTMLDivElement | null>(null);
    const [hasAnimated, setHasAnimated] = useState(false);
    const isVisible = useIsVisible(divRef);
    const targetWidth = percent;

    const initialWidth = hasAnimated ? targetWidth : 0;

    const animation = useSpring({
        width: isVisible ? targetWidth : initialWidth,
        config: { duration: 2000 }, // Adjust duration as needed
        onRest: () => {
          if (isVisible && !hasAnimated) {
            setHasAnimated(true);
          }
        },
      });

      useEffect(() => {
        // Trigger the animation when the component initially mounts
        if (!hasAnimated) {
          setHasAnimated(true);
        }
      }, [hasAnimated]);


//   const animation = useAnimatedWidth(isVisible, percent);
    
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
