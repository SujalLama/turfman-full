"use client";

import Image from "next/image";
import FaIcons from "./FaIcons";
import { useEffect, useRef, useState } from "react";

interface IVideoBlock {
    link: string;
    placeHolderImg: {
        src: string;
        alt: string;
    },
}

export default function VideoBlock({data}: {data: IVideoBlock}) {
    const [openVideo, setOpenVideo] = useState(false);
    const videoContainer = useRef<null | HTMLDivElement>(null);

    
    useEffect(() => {
        
        const clickHandler = (e : MouseEvent) => {
            if(
                openVideo &&
                videoContainer.current
                && e.target 
                instanceof Node && !videoContainer.current?.contains(e.target)) {
                    
                setOpenVideo(false);
            }
        }

        document.addEventListener('click', clickHandler);
        return () => document.removeEventListener('click', clickHandler);
        
    }, [openVideo])

    useEffect(() => {
        const body = document.querySelector('body');
        if(!body) return;

        if(openVideo) {
            body.style.overflow = 'hidden';
        } else {
            body.style.overflow = 'auto'; 
        }
    }, [openVideo])

    const openVideoHandler = () => {
        setOpenVideo(true);
    }

    const closeVideoHandler = () => {
        setOpenVideo(false);
    }

    const onKeyDown = (event : React.KeyboardEvent<HTMLDivElement>) => {
        event.preventDefault();
        if (event.key === 'Enter' || event.key === ' ') {
          setOpenVideo(true);
        }
      }
    
  return (
    <>
        {openVideo && <div className="fixed top-0 left-0 w-full h-full bg-black/80 z-[100]">
            <div className="flex flex-col items-end justify-center h-full w-full max-w-[900px]  mx-auto text-right px-3.5">
                <button className="mb-2 font-bold text-xl" onClick={closeVideoHandler} tabIndex={0}>x</button>
                <div ref={videoContainer} className="w-full h-0 overflow-hidden pt-[56.25%] relative">
                    <iframe src={data.link} className="w-full h-full bg-black absolute block top-0 left-0">
                    </iframe>
                </div>
            
            </div>
        </div>}

        <div className="relative group" onClick={openVideoHandler} 
            role="button" tabIndex={0} 
            onKeyDown={onKeyDown}>
            <Image className="rounded-[5px] w-full cursor-pointer" src={data.placeHolderImg.src}
            width="290" height="260" alt={data.placeHolderImg.alt} />
            
            {/* <!--play button--> */}
            <div
                className="hidden group-hover:flex absolute w-[65px] h-[65px] 
                    rounded-full bg-white/80 text-black top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center items-center justify-center">
                <FaIcons icon="faPlay" className="text-xl leading-[65px]" />
                <div className=" w-[65px] h-[65px] border-8 border-white/80 p-2 motion-safe:animate-ping rounded-full absolute top-0">
                </div>
                <div className=" w-[65px] h-[65px] border-8 border-white/80 p-4 motion-safe:animate-ping-slow rounded-full absolute top-0">

                </div>
            </div>
        </div>
    </>
  )
}
