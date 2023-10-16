import Image from "next/image";

const galleryData = [
    {
        src: 'https://theturfman.com.au/wp-content/uploads/2020/08/vehicle-630x250.jpg',
        alt: "turf-instaling-vehicle-in-perth",
        width: 630,
        height: 250,
    },
    {
        src: 'https://theturfman.com.au/wp-content/uploads/2020/08/observing.jpg',
        alt: "turf-inspection-in-perth",
        width: 290,
        height: 260,
    },
    {
        src: 'https://theturfman.com.au/wp-content/uploads/2020/08/stack-290x260.jpg',
        alt: "quality-turf-in-perth",
        width: 290,
        height: 260,
    },
];
export default function Gallery() {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:justify-between">
        {
            galleryData.map((galleryItem) => {
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
