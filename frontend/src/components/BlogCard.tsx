import Image from "next/image";
import Link from "next/link";
import FaIcons from "./FaIcons";

export interface IBlogCard {
    id: string;
    title: string;
    img: {
        src: string;
        alt: string;
    },
    category: string;
    link: string;
    comments: number;
    date: string;
}

export default function BlogCard({data}: {data : IBlogCard}) {
  return (
    <>
        <div className="relative mb-4 md:mb-10">
            <div className="rounded-[5px] group-hover:-translate-y-1 transition-transform ease-in-out duration-500">
                <Image 
                    width="612" 
                    height="382" 
                    src={data.img.src} 
                    alt={data.img.alt}
                    className="rounded-[5px]" 
                />
            </div>			
            <div className="absolute top-4 right-4">
                <Link href={`blogs/?category=${data.category}`} className="py-[6px] px-[25px] bg-primary rounded-2xl text-white uppercase font-bold text-[12px] tracking-[0.5px]" rel="category tag">
                    {data.category}
                </Link>
            </div>
        </div>
        <div>
            <div className="-mx-2 flex items-center">
                <div className="text-[13px] mb-1 mx-2">					
                    <FaIcons icon="faCalendarDays" className="mr-1 text-primary" />
                    <span>{data.date}</span>
                </div>
                <div className="text-[13px] mb-1 mx-2">	
                    <FaIcons icon="faComments" className="mr-1 text-primary" />
                    <span>{data.comments == 0 ? 'No' : data.comments} Comments</span>
                </div>            
            </div>
            
            <h3 className="text-[22px] text-gray-darker font-bold leading-tight mt-4 hover:text-primary transition-all ease-in-out duration-500">
                <Link href={data.link}>
                    {data.title}
                </Link>
            </h3>
            <Link 
                className="text-gray-darker mt-6 inline-block uppercase tracking-[1px] text-[13px] font-semibold border-b-2 border-[#e7e7e7] hover:border-primary transition-all ease-in-out duration-500 pb-1" 
                href={data.link}>
                Read More
            </Link> 
        </div>
    </>
  )
}
