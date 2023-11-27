import Wysiwyg from "@/components/Wysiwyg";
import Link from "next/link";
import Image from "next/image";
import FaIcons from "@/components/FaIcons";
import Comments from "@/components/Comments";


export interface IBlogContent {
  img: {src: string; alt: string};
  category: {id: number; slug: string; name: string;};
  link: string;
  date: string;
  author: string;
  body: string;
  id: number;
}


export default function SingleBlog({data}: {data: IBlogContent}) {
  return (
    <>
        <div className="relative w-full">
            <Link href={data.link} className=" group-hover:-translate-y-1 transition-transform ease-in-out duration-500">
                <Image width="612" height="382" src= {data.img.src}
                className="rounded-t-[5px] w-full h-full object-cover object-center" alt={data.img.alt} />
            </Link>			
            <div className="absolute top-4 right-4">
                <Link href={`/blogs?category=${data.category.slug}`} className="py-[6px] px-[25px] bg-primary rounded-2xl text-white uppercase font-bold text-[12px] tracking-[0.5px]" rel="category tag">
                    {data.category.name}
                </Link>
            </div>
        </div>

        <div className="text-[14px] my-6 pb-6 flex flex-wrap -mx-2 border-b border-black/10">
            <div className="mb-1 mx-2">
                <FaIcons icon="faCalendarDays" className="text-primary mr-1" />
                <span>{data.date}</span>
            </div>
            <div className="mb-1 mx-2">
                <FaIcons icon="faUser" className="text-primary mr-1" />
                <span>By the {data.author}</span>
            </div>
            <div className="mb-1 mx-2">
            <Comments commentId={data.id} />
            </div>
        </div>
        <Wysiwyg className="my-8" content={data.body} />
    </>
  )
}
