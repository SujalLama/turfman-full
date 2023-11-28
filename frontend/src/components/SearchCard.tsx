import Image from "next/image";
import Link from "next/link";

interface ISearchCard {
    id: number;
    img: {src: string; alt: string};
    category: string;
    link: string;
    title: string;
    desc: string;
    type: string;
}

export default function SearchCard({img, category, link, title, desc, type}: ISearchCard) {
  return (
    <div className="group mb-10 md:flex md:items-center md:p-6 md:shadow-lg md:rounded-[5px]">
        {type !== "post" && <div className="relative mb-4 md:mb-0 md:w-[175px] md:h-[175px] md:mr-7.5 md:shrink-0">
            <div className="rounded-[5px] group-hover:-translate-y-1 transition-transform ease-in-out duration-500 md:w-full md:h-full">
                <Image 
                    width="300" 
                    height="300" 
                    src={img.src} 
                    className="rounded-[5px] w-full h-full object-cover object-center" 
                    alt={img.alt} 
                />
            </div>			
            <div className="absolute top-4 right-4 md:left-4">
                <Link href={`/blogs/?category=${category}`} className="py-[6px] px-[12px] bg-primary rounded-2xl text-white uppercase font-semibold text-[12px] tracking-[0.5px]" rel="category tag">
                    {category}
                </Link>
            </div>
        </div>}
        <div className="md:flex-1 ">
            <h3 className="text-[22px] text-gray-darker font-bold leading-tight mt-4 md:mt-0 hover:text-primary transition-all ease-in-out duration-500">
                <Link href={link}>{title}</Link>
            </h3>
            <p className="line-clamp-2 mt-2">{desc}</p>
            <Link 
                className="text-gray-darker mt-4 inline-block uppercase tracking-[1px] text-[13px] font-semibold border-b-2 border-[#e7e7e7] hover:border-primary transition-all ease-in-out duration-500 pb-1" 
                href={link}>
                    Read More
            </Link> 
        </div>
    </div>
  )
}
