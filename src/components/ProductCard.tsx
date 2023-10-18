'use client';

import Image from "next/image";
import Link from "next/link";
import Button from "./forms/Button";

export interface IProductCardProps {
    id: string;
    img: {src: string; alt: string};
    price: number;
    name: string;
    desc: string;
    link: string;
    stock: number;
}

export default function ProductCard({img, price, name, desc, link, stock}: IProductCardProps) {
  return (
    <>
    <Link href="./product-single.html" className="w-full">
        <Image  
            src={img.src}
            className="w-full rounded-t-[5px]"
            width={300}
            height={300}
            alt={img.alt} 
        />
    </Link>

    <div className="p-4">
        <span className="text-base pb-2 inline-block">
            <span className="font-bold">${price}</span>
        </span>
        <h2 className="pb-2 text-gray-darker font-semibold text-2xl">{name}</h2>
        <p className="line-clamp-2 leading-snug" dangerouslySetInnerHTML={{__html: desc}}></p>
        <Link href={link}  className="underline text-sm tracking-[0.5px] hover:text-primary inline-block">
            Read more
        </Link>
        <Button 
            className="block mt-6 text-center disabled:bg-red disabled:cursor-not-allowed" 
            name={stock !== 0 ? "Add to Cart" : 'Out of Stock'} 
            onClick={() => {}} 
            disabled={stock == 0} 
        />
    </div>
    </>
  )
}
