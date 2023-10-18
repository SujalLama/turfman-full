import FaIcons from "@/components/FaIcons";
import Image from "next/image";
import Link from "next/link";

interface IBlogContentHeader {
    img: {src: string; alt: string};
    category: string;
    link: string;
    date: string;
    author: string;
    comments: number;
}

export default function BlogContentHeader({img, category, link, date, author, comments} : IBlogContentHeader) {
  return (
    <>
        <div className="relative w-full">
            <Link href={link} className=" group-hover:-translate-y-1 transition-transform ease-in-out duration-500">
                <Image width="612" height="382" src= {img.src}
                className="rounded-t-[5px] w-full h-full object-cover object-center" alt={img.alt} />
            </Link>			
            <div className="absolute top-4 right-4">
                <Link href={`/blog?category=${category}`} className="py-[6px] px-[25px] bg-primary rounded-2xl text-white uppercase font-bold text-[12px] tracking-[0.5px]" rel="category tag">
                    {category}
                </Link>
            </div>
        </div>

        <div className="text-[14px] my-6 pb-6 flex flex-wrap -mx-2 border-b border-black/10">
            <div className="mb-1 mx-2">
                <FaIcons icon="faCalendarDays" className="text-primary mr-1" />
                <span>{date}</span>
            </div>
            <div className="mb-1 mx-2">
                <FaIcons icon="faUser" className="text-primary mr-1" />
                <span>By the {author}</span>
            </div>
            <div className="mb-1 mx-2">
            <FaIcons icon="faComments" className="text-primary mr-1" />
                <span>{comments == 0 ? 'No' : comments} Comments</span>
            </div>
        </div>
    </>
  )
}
