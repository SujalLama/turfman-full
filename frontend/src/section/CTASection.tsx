import Image from "next/image";
import Link from "next/link";

export interface ICtaSection {
    img: {src: string; alt: string;};
    title: string;
    links: {name: string; path: string;}[]
}

export default function CTASection({data, className} : {data: ICtaSection, className?: string;}) {
  return (
    <section className={`relative before:content-[''] before:absolute before:left-0 before:top-0 before:w-full before:h-full  before:z-10 before:bg-primary/80 ${className ? className : ''}`}>
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image src={data.img.src} alt={data.img.alt} fill className="object-cover object-center" />
        </div>
        <div className="px-7.5 py-25 mx-auto text-white relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            <div className="large:flex large:items-center large:justify-between">
                <h2 className="text-[36px] text-center font-bold leading-tight large:text-left large:w-1/2 xl:w-3/5 large:mr-12">
                    {data.title}
                </h2>
                <div className="mt-16 text-center px-8 large:px-0 sm:mt-12 large:mt-0 large:flex large:items-center">
                    {
                        data.links.map((link, i) => {
                            const className = [
                                `w-full sm:w-1/2 md:w-auto inline-block hover:bg-white transition-all 
                                ease-in-out duration-500 text-white hover:text-gray-darker  tracking-[1px] 
                                font-medium leading-[24px] text-[13px] py-3.5 px-7.5 bg-gray-darker border-[2px] border-gray-darker
                                 hover:border-white uppercase rounded-[5px] font-display md:mr-4 mb-4 large:mb-0`,
                                 `w-full sm:w-1/2 md:w-auto inline-block hover:bg-white transition-all ease-in-out 
                                 duration-500 text-white hover:text-gray-darker  tracking-[1px] font-medium leading-[24px] text-[13px] 
                                 py-3.5 px-7.5 border-[2px] border-white uppercase rounded-[5px] font-display`
                            ]
                            return (
                                <Link key={link.name} href={link.path} 
                                    className={className[i]}>
                                    {link.name}
                                </Link>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    </section>
  )
}
