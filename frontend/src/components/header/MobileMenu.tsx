

'use client';

import { useState } from 'react';
import NavLink from '../NavLink';
import Image from 'next/image';
import Link from 'next/link';
import FaIcons from '../FaIcons';

export interface ILink {
    name: string;
    path: string;
}

interface IMbMenu {
    logo: {url: string; alt: string; title: string},
    links: ILink[],
}

export default function MobileMenu({data} : {data : IMbMenu}) {
    const [active, setActive] = useState(false);

  return (
    <>
        <div className="px-7.5 block xl:hidden">
            <div className="flex items-center justify-between py-1.5">
                <Link href="/">
                    <Image 
                        className="max-h-25" 
                        src={data.logo.url} 
                        alt={data.logo.alt} 
                        title={data.logo.title} 
                        width={300}
                        height={100}
                        />
                </Link> 
                
                <div className="h-[24px] w-[35px] cursor-pointer relative ml-6" onClick={() => setActive(true)}>
                    <span className="w-full h-1 rounded-[1px] bg-black block absolute top-0"></span>
                    <span className="w-full h-1 rounded-[1px] bg-black block absolute top-2.5"></span>
                    <span className="w-full h-1 rounded-[1px] bg-black block absolute top-5"></span>
                </div>
            </div>
        </div>
        <div className={`fixed top-0 right-0 z-50 w-[300px] h-full bg-black-light 
            text-white font-display text-sm uppercase font-medium leading-5 tracking-[0.5px] 
            xl:hidden transition-transform ease-in-out duration-[0.4s] ${active ? 'translate-x-0' : 'translate-x-[400px]'}`}>
            <span className="cursor-pointer text-3xl absolute top-[25px] right-[35px]" onClick={() => setActive(false)}>
                <FaIcons icon="faXmark" />
            </span>
            
            <ul className="py-[90px]">
                {data.links.map(link => {
                    return (
                    <li key={link.name} className="border-b border-[rgba(204,204,204,.10)]">
                        <NavLink className="inline-block w-full px-[25px] py-3.5  hover:bg-gray-dark 
                            transition-all ease-in-out duration-500" path={link.path} name={link.name} activeClass="bg-gray-dark" />
                    </li>
                    )
                })}
                <li key="/cart" className="border-b border-[rgba(204,204,204,.10)]">
                        <NavLink className="inline-block w-full px-[25px] py-3.5  hover:bg-gray-dark 
                            transition-all ease-in-out duration-500" path="/cart" name="My cart" activeClass="bg-gray-dark" />
                    </li>
            </ul>
        </div>
    </>
  )
}
