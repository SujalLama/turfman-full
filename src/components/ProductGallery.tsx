"use client";

import Image from "next/image";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";

import { useState } from "react";
import {
  isImageFitCover,
  isImageSlide,
  useLightboxProps,
} from "yet-another-react-lightbox";


export default function ProductGallery({images}: {images: {src: string; alt: string;}[]}) {
  const [imageActive, setImageActive] = useState(0);
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full h-auto">
        <Image 
          src={images[imageActive].src} 
          alt={images[imageActive].alt} 
          width={600} 
          height={600}
          onClick={()=> setOpen(true)}
        />
        <Lightbox
        open={open}
        close={() => setOpen(false)}
        slides={images}
        index={imageActive}
        plugins={[Zoom]}
      />
        {
          images.length > 1 && (
            <div className="flex overflow-x-auto space-x-3 px-2 pb-3 mt-4">
                {
                  images.map((image, i) => {
                    return <button key={image.src} className="w-[100px] h-[100px] flex-shrink-0 focus:ring-1" onClick={() => setImageActive(i)}>
                      <Image src={image.src} alt={image.alt} width={100} height={100} className="w-full h-full object-cover" />
                      </button>
                  })
                }
              
            </div>
          )
        }
      
    </div>
  )
}
