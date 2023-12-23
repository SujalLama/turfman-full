'use client';

import { Link } from 'nextjs13-progress';
import { usePathname, useSearchParams } from "next/navigation";
import { Fragment } from "react";

export default function Breadcrumb() {
    const router = usePathname();
    const searchParams = useSearchParams()
    const search = searchParams.get('s')
    
    const breadcrumbList = router.split('/');
  return (
    <div className="text-sm font-display font-medium">
        <Link href='/' className="hover:text-primary">The Turfman Perth</Link>
        <span className="px-1">{'>'}</span>
        {
            breadcrumbList.map((breadcrumb, i) => {
                if(breadcrumb !== "") {
                    return (
                        <Fragment key={breadcrumb}>
                            {
                                i == (breadcrumbList.length - 1) 
                                    ? <span className="capitalize">{breadcrumb == 'search' ? `Search results for "${search ?? ''}"` : breadcrumb}</span> 
                                    : (<>
                                        <Link href={`/${breadcrumb}`} className="hover:text-primary capitalize">{breadcrumb}</Link> 
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
