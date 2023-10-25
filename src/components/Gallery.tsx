import Image from "next/image";

export interface IGallery {
    alt: string; 
    src: string;
    width: number;
    height: number;
}

export default function Gallery({data}: {data: IGallery[]}) {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-between">
        {
            data.map((galleryItem) => {
                return (
                    <div key={galleryItem.src} className="rounded-[5px] mb-4 text-center w-full sm:first:w-full sm:even:mr-5  sm:w-[calc(50%_-_10px)]">
                        <Image 
                            className="rounded-[5px] w-full h-full object-cover object-center" 
                            src={galleryItem.src} 
                            width={galleryItem.width} 
                            height={galleryItem.height} 
                            alt={galleryItem.alt} />
                    </div>
                )
            })
        }
    </div>
  )
}
