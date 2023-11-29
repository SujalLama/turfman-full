'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

interface INavLink {
    name: string; 
    path: string; 
    className?: string; 
    activeClass?: string;
    iconLink?: boolean;
    iconOptions?: {
        icon: any,
        showLeft?: boolean 
    };
}

export default function NavLink({name, path, className, activeClass, iconLink = false, iconOptions} : INavLink) {
  const pathname = usePathname();

  return (
    <Link  
        href={path} 
        className={`${className}
        ${pathname === path ? ` ${activeClass}` : ''}
        `}
    >
        {
            !iconLink ? name : (
                <>
                    {iconOptions?.showLeft && iconOptions.icon }
                    <span className="font-sans text-base">
                        {name}
                    </span>
                    {!iconOptions?.showLeft && iconOptions?.icon }
                </>
            )
        }
    </Link>
  )
}
