import NavLink from "../NavLink"
import Image from "next/image"
import Link from "next/link"
import FaIcons from "../FaIcons"

const footerData = {
  bgImg: {
    url: 'https://theturfman.com.au/wp-content/uploads/2020/10/theturfman-footer-min.jpg',
    alt: 'background image'
  },
  title: 'The Turf Man',
  desc: 'At Western Australia, We don’t just provide residential and commercial turf services; we make earth looks prettier and healthier.',
  phone: '0410752082',
  openTime: 'Mon-Sat: 10am &#8211; 4:30pm',
  highlights: [
    {
      name: 'About Us',
      path: '/about'
    },
    {
      name: 'Privacy Policy',
      path: '/blogs/privacy-policy'
    },
    {
      name: 'Refund and Returns Policy',
      path: '/blogs/refund-policy'
    },
    {
      name: 'Contact Us',
      path: '/contact',
    }
  ],
  blogs: [
    {
      title: 'Quick Winter Lawn Care Tips',
      link: '/blogs/quick-winter-lawn-care-tips/',
      img: 'https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg',
    },
    {
      title: 'Tips to Pet Friendly Lawn',
      link: '/blogs/quick-winter-lawn-care-tips/',
      img: 'https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-150x150.jpg',
    },
    {
      title: 'Benefits of Fertilising Your Lawn',
      link: '/blogs/quick-winter-lawn-care-tips/',
      img: 'https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-150x150.jpg',
    },
  ],
  contact: [
    {
      title: 'address',
      detail: '6 Anvil Way, Welshpool, 6106',
      link: '',
      icon: 'faLocationDot'
    },
    {
      title: 'contact',
      detail: '0410752082',
      link: 'fa',
      icon: 'faPhone'
    },
    {
      title: 'email',
      detail: 'contact@theturfman.com.au',
      link: '',
      icon: 'faEnvelope'
    },
  ],
  copy: 'Copyright © 2020 All Rights Reserved theturfman.com.au.'
}

export default function Footer() {
  return (
    <footer className="relative">
      <div className="absolute top-0 left-0 w-full h-full -z-10">
        <Image src={footerData.bgImg.url} alt={footerData.bgImg.alt} fill  className="object-cover object-center" />
      </div>
        <div className="py-[25px] px-7.5 text-white/80 sm:mx-auto sm:max-w-[540px] md:max-w-[720px] xl:px-3.5 large:max-w-[960px] xl:max-w-[1200px]">
            <div className="md:flex md:flex-wrap md:-mx-3.5">
                <div className="mt-[35px] mb-5 md:max-w-1/2 md:basis-1/2 md:px-3.5 md:flex-shrink-0 md:flex-grow-0 large:max-w-[27%] large:basis-[27%] ">
                    
                    <h3 className="text-white text-[36px] leading-[42px] font-bold mb-5">{footerData.title}</h3>
                    <p className="mb-[25px]">{footerData.desc}</p>
                    <div className="text-white">
                        <span className="">Get a Quote</span><br />
                        <span className="text-[24px] leading-[34px] font-bold"
                        >
                          <Link className="hover:text-primary transition-colors duration-500 ease-in-out" href="tel:+61410752082">
                          {footerData.phone}
                          </Link>
                        </span>
                    </div>
                    <div className="">
                        <span className="font-bolder">
                          <i className="fa-regular fa-clock mx-[4px] text-[14px] text-primary"></i>
                          <strong>Open Hours</strong></span><br />
                        <span dangerouslySetInnerHTML={{__html: footerData.openTime}}>
                        </span>
                    </div>		
                </div>

                <div className="text-white pt-[35px] pb-5 md:max-w-1/2 md:basis-1/2 md:px-3.5 md:flex-shrink-0 md:flex-grow-0 large:max-w-[18%] large:basis-[18%]">
                    <h2 className=" text-lg leading-[28px] font-semibold mb-10 large:mb-[40px]">Highlights</h2>
                    <nav>
                      {
                        footerData.highlights.map(link => {
                          return (
                            <>
                            <NavLink 
                              key={link.name}
                              path={link.path} 
                              name={link.name}  
                              className="inline-block hover:text-primary transition-all ease-in-out duration-500 mb-3.5"
                              activeClass="text-primary"
                              iconLink={true}
                              iconOptions={{icon: <FaIcons icon="faChevronRight" className="text-[12px] mr-2.5"/>, showLeft: true}}
                              />
                              <br />
                            </>
                          )
                        })
                      }
                    </nav>
                            
                </div>

                <div className="pt-[35px] pb-5 md:max-w-1/2 md:basis-1/2 md:px-3.5 md:flex-shrink-0 md:flex-grow-0 large:max-w-[28%] large:basis-[28%]">
                    <h2 className="text-lg leading-[28px] font-semibold mb-10 large:mb-[40px] text-white">Press &#038; Blogs</h2>
                    <ul>
                      {
                        footerData.blogs.map(blog => {
                          return (
                            <li className="flex pb-3.5 items-start" key={blog.title}>
                                <Link href={blog.link} className="w-[70px] h-[70px] block mr-3.5 shrink-0">
                                    <Image 
                                      width={150} 
                                      height={150} 
                                      src={blog.img} 
                                      className="w-full h-full object-cover object-center"
                                      sizes="(max-width: 150px) 100vw, 150px"
                                      alt={blog.title}
                                      />
                                </Link>
                                <Link href={blog.link} className="hover:text-primary transition-colors duration-500 ease-in-out">{blog.title}</Link>
                            </li>
                          )
                        })
                      }
                    </ul>    							
                </div>
                
                                                    
                <div className="pt-[35px] pb-5 text-white md:max-w-1/2 md:basis-1/2 md:px-3.5 md:flex-shrink-0 md:flex-grow-0 large:max-w-[26%] large:basis-[26%]">
                    <h2 className="text-lg leading-[28px] font-semibold mb-10 large:mb-[40px]">The Turf Man</h2>
                    <div >
                      
                      {
                        footerData.contact.map(contactItem => {
                          return (
                            <div key={contactItem.detail} className="flex items-center mb-3.5">
                                {/* {faIcons[contactItem.icon]} */}
                                <FaIcons icon={contactItem.icon} className="text-3xl w-7.5 text-primary mr-6 shrink-0" />
                                <div>
                                    <strong className="font-bolder mb-[5px]">{contactItem.title}</strong><br />
                                    <Link href={contactItem.link} className="break-words hover:text-primary transition-all duration-500 ease-in-out">
                                      {contactItem.detail}
                                    </Link>
                                </div>
                            </div>
                          )
                        })
                      }
                    </div>                      
                </div>
                
            </div>

            <div className="mt-[25px] mb-5 pb-3.5 pt-10 border-t border-gray-border text-3.5 text-center md:md:-mx-3.5">
                <p>{footerData.copy}</p>
            </div>
        </div>
    </footer>
  )
}
