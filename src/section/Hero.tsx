"use client";
import FaIcons from "@/components/FaIcons";
import Image from "next/image";
import Link from "next/link";
import { CSSProperties } from "react";
import { Carousel } from "react-responsive-carousel";

const heroData = [
    {
        img: {
            url: 'https://theturfman.com.au/wp-content/uploads/2020/08/Clean-turf-2.jpg',
            title: 'Clean-turf-perth',
            alt: 'best-turf-in-perth'
        },
        title: 'Make your open space<br/>clean decent.',
        links: [
            {name: 'SHOP NOW', path: '/shop'},
            {name: 'CONTACT US', path: '/contact'},
        ]
    },
    {
        img: {
            url: 'https://theturfman.com.au/wp-content/uploads/2021/01/mowing1.jpeg',
            title: 'Clean-turf-perth',
            alt: 'best-turf-in-perth'
        },
        title: 'Make new friends',
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
        title: 'Make sometime to think',
        links: [
            {name: 'SHOP NOW', path: '/shop'},
            {name: 'CONTACT US', path: '/contact'},
        ]
    },
]


export default function Hero() {
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
                    autoPlay 
                    showIndicators={false} 
                    animationHandler="fade"
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
                >
                {   
                    heroData.map(heroItem => {
                        return (
                            <div className="max-h-[740px] h-[100vw] " key={heroItem.title}>
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
                                                
                                            <span className="hidden sm:inline-block font-display mb-5 text-[0.93rem] tracking-[4px] font-bold uppercase bg-white text-[rgb(34,34,34)] py-[5px] px-3.5">Decorate  earth canvas</span> 
                                            <h1 className="leading-[1.24] mb-[26px] font-bold text-[clamp(1rem,10vw,4.0625rem)] text-white" dangerouslySetInnerHTML={{__html: heroItem.title}}></h1>

                                            {
                                                heroItem.links.map((link, i) => {
                                                    const className = [
                                                        'bg-primary hover:bg-gray-darker transition-all ease-in-out duration-500 text-white tracking-[1px] font-medium text-sm py-[12px] md:py-[17px] px-5 md:px-[42px] rounded inline-block  font-display mr-7.5',
                                                        'hidden sm:inline-block bg-primary hover:bg-gray-darker transition-all ease-in-out duration-500 text-white  tracking-[1px] font-medium text-sm py-[12px] md:py-[17px] px-5 md:px-[42px] rounded font-display'
                                                    ]
                                                    return <Link href={link.path} key={link.path} className={className[i]}>{link.name}</Link>
                                                })
                                            }
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

