'use client';

import { useEffect, useRef, useState } from "react";
import MobileMenu from "./MobileMenu";
import NavLink from "../NavLink";
import FaIcons from "../FaIcons";

const mainMenuData = {
  logo: {
    url: 'https://theturfman.com.au/wp-content/uploads/2020/07/Logo.jpeg', 
    title: 'The Turfman Perth', 
    alt: 'The Turfman Perth'
  },
  links : [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'About Us',
      path: '/about',
    },
    
    {
      name: 'Contact Us',
      path: '/contact',
    },
    
    {
      name: 'Blog',
      path: '/blogs',
    },
    
    {
      name: 'Shop',
      path: '/shop',
    },
    
    {
      name: 'My Account',
      path: '/login',
    },
    
  ]
}

export default function MainHeader() {
  const [scrollActive, setScrollActive] = useState(false);
  const headerTop = useRef(0);

  useEffect(() => {
    const container = document.querySelector('#containerHeader') as HTMLDivElement;
    if(container?.offsetTop) {
      headerTop.current = container.offsetTop
    }
  }, [])

  useEffect(() => {
    
    if(!headerTop.current) {
      return;
    }

    function scrollHandler () {
      if(window.scrollY > headerTop.current) {
        setScrollActive(true)
      } else {
        setScrollActive(false)
      }
    }

    window.addEventListener('scroll', scrollHandler);

    return () => window.removeEventListener('scroll', scrollHandler);
    
    
  }, []);


  return (
    <>
    <div id="containerHeader" className="sticky top-0 left-0 right-0 z-50 hidden xl:block">
            <div className="mx-auto px-3.5 max-w-full sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px] xl:max-w-[1200px]">
                <div className={`bg-primary h-[68px] text-white 
                font-display text-sm leading-[68px] font-medium tracking-[0.5px]
                uppercase rounded-[3px] ${scrollActive ? ' shadow-2xl' : ''}
                `}>
                    <div className="flex justify-between">
                        
                        <nav className="h-full">
                            
                            <div className="flex items-center">
                              {
                                mainMenuData.links.map(link => {
                                  return (
                                      <NavLink 
                                          key={link.path}
                                          path={link.path}
                                          name={link.name}
                                          className="block border-r border-white/20 h-full first:rounded-l-[3px] hover:bg-gray-darker transition-all ease-in-out duration-500 px-[25px]"
                                          activeClass="bg-gray-darker"
                                      />
                                  )
                              })
                              }
                            </div>
                                                
                        </nav>

                        <div className="flex items-center">
                            <NavLink 
                              path="/cart" 
                              name="&#036;0.00" 
                              iconLink={true} 
                              activeClass="bg-gray-darker"
                              iconOptions={{icon: <FaIcons icon="faCartShopping" className="text-[25px] px-2.5"/>, showLeft: true}}
                              className="flex items-center border-r border-white/20 h-full hover:bg-gray-darker transition-all ease-in-out duration-500 pr-5"
                              />

                            <NavLink 
                              path="/contact" 
                              name="GET QOUTE" 
                              iconLink={true} 
                              activeClass=""
                              iconOptions={{icon: <FaIcons icon="faArrowRight" className="px-[8px]"/>, showLeft: false}}
                              className="flex items-center h-full hover:bg-gray-darker transition-all ease-in-out duration-500 px-7.5 rounded-r-[3px]"
                              />
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <MobileMenu data={mainMenuData} />
    </>
  )
}
