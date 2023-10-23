"use client";

import FaIcons from "@/components/FaIcons";
import HeroSubtitle from "@/components/hero/HeroSubtitle";
import HeroTitle from "@/components/hero/HeroTitle";
import Image from "next/image";
import { CSSProperties, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import HeroButtons from "../components/hero/HeroButtons";

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


export default function Hero() {
    const [active, setActive] = useState(0);

        const arrowStyles: CSSProperties = {
            position: 'absolute',
            zIndex: 2,
            top: 'calc(50% - 15px)',
            cursor: 'pointer',
        };

        return (
            <section className="xl:-mt-7.5 group">
                <Carousel 
                    infiniteLoop 
                    showStatus={false} 
                    animationHandler="fade"
                    renderArrowPrev={(onClickHandler, hasPrev, label) =>
                        hasPrev && (
                            <button 
                                type="button" 
                                onClick={() => {
                                    setActive(prev => {
                                        if(prev == 0) {
                                            return heroData.length - 1;
                                        } else {
                                            return prev - 1;
                                        }
                                    });
                                    onClickHandler();
                                }} 
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
                                onClick={() => {
                                    setActive(prev => {
                                        if(prev === heroData.length - 1) {
                                            return 0;
                                        } else {
                                            return prev + 1;
                                        }
                                    });
                                    onClickHandler()
                                }} 
                                title={label} 
                                style={{ ...arrowStyles, right: 15 }}
                                className="w-[30px] h-[30px] md:w-[60px] md:h-[60px] opacity-0 group-hover:opacity-100 bg-white hover:bg-white/70 transition-all duration-500 ease-in-out" 
                                >
                                <FaIcons icon="faChevronRight" />
                            </button>
                        )
                    }
                >
                {   
                    heroData.map((heroItem, i) => {

                        return (
                            <div className="max-h-[740px] h-[100vw]" key={heroItem.title}>
                                <div className="w-full h-full relative">
                                    <div className="bg-[rgba(0,0,0,0.0)] w-full h-full absolute top-0 left-0 -z-10"></div>

                                    <Image 
                                        src={heroItem.img.url} 
                                        alt={heroItem.img.alt} 
                                        title={heroItem.img.title} 
                                        fill
                                        className="w-full h-full object-cover object-center" 
                                    />

                                    <div className="absolute left-0 top-1/2 -translate-y-1/2 right-0 z-20">
                                        <div className="px-7.5 xl:max-w-[1200px] xl:px-3.5 mx-auto text-left">
                                                <div className={`${(((i + 1) / 2) === 1) ? "max-w-[800px] odd:ml-auto" : ""}`}>
                                                    <HeroSubtitle 
                                                        subTitle={heroItem.subTitle}
                                                        view={active === i}
                                                    />
                                                    <HeroTitle 
                                                        title={heroItem.title} 
                                                        key={i} 
                                                        view={active === i} 
                                                    />
                                                    <HeroButtons links={heroItem.links} view={active === i} />
                                                </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
                </Carousel>
            </section>
        );
}

