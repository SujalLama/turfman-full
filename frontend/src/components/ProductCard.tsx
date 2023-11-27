'use client';

import Image from "next/image";
import Link from "next/link";
import Button from "./forms/Button";
import { useContext } from "react";
import { CartContext, Types } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";

export interface IProductCardProps {
    id: number;
    img: {src: string; alt: string};
    price: number | [number, number];
    name: string;
    desc: string;
    link: string;
    stock: number | null;
    option?: boolean;
    unit: string;
}

export default function ProductCard({id, img, price, name, desc, link, stock, option, unit}: IProductCardProps) {
    const {state, dispatch} = useContext(CartContext);
    const router = useRouter();

    function isProductAdded () : boolean {
        const addedCart = state.find((cart) => cart?.id == id);

        if(addedCart) {
            return true;
        }

        return false;
    }

    function addToCart () {
        if(isProductAdded() || option) {
            router.push(link)
            return;
        }
        dispatch({type: Types.Add, payload: {id, img, price : 1, name, link, quantity : 1}})
    }

  return (
    <>
    <Link href={link} className="w-full">
        <div className="h-[200px] relative">
            <Image  
                src={img.src}
                className="w-full object-cover rounded-t-[5px]"
                fill
                alt={img.alt} 
            />
        </div>
    </Link>

    <div className="p-4">
        {price ? <span className="text-base pb-2 inline-block">
            <span className="font-bold">
                {(typeof(price) === "object") ? `$${price[0]} - $${price[1]}` : '$' + price}
            </span>
            <span className='pl-2'>per {unit}</span>
        </span> : null}
        <h2 className="pb-2 text-gray-darker font-semibold text-2xl">{name}</h2>
        <p className="line-clamp-2 leading-snug" dangerouslySetInnerHTML={{__html: desc}}></p>
        <Link href={link}  className="underline text-sm tracking-[0.5px] hover:text-primary inline-block">
            Read more
        </Link>
        <Button 
            className="block mt-6 text-center disabled:bg-red disabled:cursor-not-allowed" 
            name={
                stock !== 0 
                ? option ? "Select Option" : isProductAdded() ? "Update Cart" : "Add to Cart" 
                : 'Out of Stock'} 
            onClick={addToCart} 
            disabled={stock == 0 || stock == null} 
        />
    </div>
    </>
  )
}
