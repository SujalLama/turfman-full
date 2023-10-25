"use client";

import FaIcons from "@/components/FaIcons";
import HeroSubtitle from "@/components/hero/HeroSubtitle";
import HeroTitle from "@/components/hero/HeroTitle";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import HeroButtons from "../components/hero/HeroButtons";

export interface IHero {
    img: {url: string; alt: string; title: string;};
    title: string;
    subTitle: string;
    links: {name: string; path: string;}[]
}
const heroData = [
    {
        img: {
            url: 'https://theturfman.com.au/wp-content/uploads/2020/08/Clean-turf-2.jpg',
            title: 'Clean-turf-perth',
            alt: 'best-turf-in-perth'
        },
        title: 'Make your open space<br/>clean decent.',
        subTitle: 'Decorate  earth canvas',
        links: [
            {name: 'SHOP NOW', path: '/shop'},
            {name: 'CONTACT US', path: '/contact'},
        ]
    },
    {
        img: {
            url: 'https://theturfman.com.au/wp-content/uploads/2021/01/mowing1.jpeg',
            title: 'Ask us about hiring DIY equipment to make your Turf laying project in less effort',
            alt: 'best-turf-in-perth'
        },
        subTitle: 'Decorate  earth canvas',
        title: 'Ask us about hiring DIY equipment to make your Turf laying project in less effort',
        links: [
            {name: 'SHOP NOW', path: '/shop'},
            {name: 'CONTACT US', path: '/contact'},
        ]
    },
    {
        img: {
            url: 'https://theturfman.com.au/wp-content/uploads/2020/08/turf-type.jpg',
            title: 'Expert opinion for purpose',
            alt: 'best-turf-in-perth'
        },
        subTitle: 'Decorate  earth canvas',
        title: 'Make sometime to think',
        links: [
            {name: 'SHOP NOW', path: '/shop'},
            {name: 'CONTACT US', path: '/contact'},
        ]
    },
]


export default function Hero({data}: {data: IHero[]}) {
    const [active, setActive] = useState(0);

        const arrowStyles: CSSProperties = {
            position: 'absolute',
            zIndex: 1000,
            top: 'calc(50% - 15px)',
            cursor: 'pointer',
        };

        return (
            <section className="xl:-mt-7.5 group">
                <Carousel
                    showThumbs={false}
                    infiniteLoop 
                    showStatus={false}
                    showIndicators={false}
                    autoPlay
                    swipeable={false}
                    dynamicHeight
                    animationHandler="fade"
                    interval={5000}
                    onChange={(index) => setActive(index)}
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button 
                                type="button" 
                                onClick={onClickHandler} 
                                title={label} 
                                className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] opacity-0 group-hover:opacity-100 bg-white hover:bg-white/70 transition-all duration-500 ease-in-out" 
                                style={{ ...arrowStyles, left: 15 }}>
                                <FaIcons icon="faChevronLeft" />
                            </button>
                        )
                    }
                    renderArrowNext={(onClickHandler, hasNext, label) =>
                        hasNext && (
                            <button 
                                type="button" 
                                onClick={onClickHandler} 
                                title={label} 
                                style={{ ...arrowStyles, right: 15 }}
                                className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] opacity-0 group-hover:opacity-100 bg-white hover:bg-white/70 transition-all duration-500 ease-in-out" 
                                >
                                <FaIcons icon="faChevronRight" />
                            </button>
                        )
                    }
                    stopOnHover={false}
                >
                {
                    data.map((item, i) => {
                        return (
                            <CarouselItem key={item.title} data={item} i={i} active={i === active} />
                        )
                    })
                }
                </Carousel>
            </section>
        );
}

interface ICarouselItem {
    title: string;
    subTitle: string;
    img: {url: string; alt: string;},
    links: {path: string; name: string;}[];
}

function CarouselItem ({data, i, active= false} : {data: ICarouselItem; i: number; active: boolean}) {
    return (
        <div className="max-h-[740px] h-[100vw] relative z-30" key={data.title}>
            
            <div className="bg-[rgba(0,0,0,0.3)] w-full h-full absolute top-0 left-0 z-10 cursor-pointer"></div>

            <Image 
                src={data.img.url} 
                alt={data.img.alt} 
                fill
                className="w-full h-full object-cover object-center" 
            />

            
            <div className="px-7.5 xl:max-w-[1200px] h-full xl:px-3.5 mx-auto text-left relative flex items-center z-50 ">
                <div className={`${(((i + 1) / 2) === 1) ? "md:max-w-[800px] md:ml-auto" : ""}`}>
                    <HeroSubtitle 
                        subTitle={data.subTitle}
                        view={active}
                    />
                    <HeroTitle 
                        title={data.title} 
                        key={i} 
                        view={active} 
                    />
                    <HeroButtons 
                        links={data.links} 
                        view={active} 
                    />
                </div>
            </div>
        </div>
    )
}