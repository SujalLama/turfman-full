"use client";

import MobileMenu from "./MobileMenu";
import NavLink from "../NavLink";
import FaIcons from "../FaIcons";
import CartButton from "../CartButton";
import MainHeaderScroll from "./MainHeaderScroll";

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
      path: '/profile',
    },
  ]
}

export default function MainHeader() {

  return (
    <>
        <MainHeaderScroll>
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
                        <CartButton />
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
        </MainHeaderScroll>
        <MobileMenu data={mainMenuData} />
    </>
  )
}
