import Breadcrumb from "@/components/Breadcrumb"
import Image from "next/image"
import Link from "next/link"

const pageHeroData = {
    bgImg: {
        src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
        alt: 'page hero'
    },
    title: 'Cart'
}

export default function PageHero() {
  return (
    <section className="relative min-h-[300px] xl:-mt-[30px]">
        <div className="absolute top-0 left-0 w-full h-full -z-20 bg-primary">
            <Image 
                fill 
                className="w-full h-full object-cover object-center" 
                src={pageHeroData.bgImg.src} 
                alt={pageHeroData.bgImg.alt} />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black/50 -z-10"></div>
        <div className="absolute top-0 left-0 w-full h-full z-10">
            
            <div className="py-16 px-7.5 h-full text-white sm:mx-auto sm:max-w-[540px] md:max-w-[720px] xl:px-3.5 large:max-w-[960px] xl:max-w-[1200px] flex  justify-center flex-col">
                <h1 className="text-[30px] sm:text-[45px] leading-[40px] font-bold mb-4 sm:mb-5">{pageHeroData.title}</h1>
                <Breadcrumb />
            </div>
        </div>
    </section>
  )
}
