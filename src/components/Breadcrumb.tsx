'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

export default function Breadcrumb() {
    const router = usePathname();
    
    const breadcrumbList = router.split('/');
  return (
    <div className="text-sm font-display font-medium">
        <Link href='/' className="hover:text-primary">The Turfman Perth</Link>
        <span className="px-1">{'>'}</span>
        {
            breadcrumbList.map((breadcrumb, i) => {
                console.log(breadcrumb);
                if(breadcrumb !== "") {
                    return (
                        <Fragment key={breadcrumb}>
                            {
                                i == (breadcrumbList.length - 1) 
                                    ? <span>{breadcrumb}</span> 
                                    : (<>
                                        <Link href={`/${breadcrumb}`} className="hover:text-primary">{breadcrumb}</Link> 
                                        <span className="px-1">{'>'}</span>
                                        </>)
                            }
                            
                        </Fragment>
                    )
                }
                return null;
            })
        }
    </div>
  )
}
