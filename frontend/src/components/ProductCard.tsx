'use client';

import Image from "next/image";
import { Link } from 'nextjs13-progress';
import Button from "./forms/Button";
import { useContext, useEffect, useState } from "react";
import { CartContext, CartType, Types } from "@/providers/CartProvider";
import { useRouter } from "next/navigation";
import { IShippingCost } from "@/utils/dataFormatter";
import axios from "axios";
import { API_URL } from "@/api/constants";
import { ShippingContext, ShippingTypes } from "@/providers/ShippingProvider";

export interface IProductCardProps {
    id: number;
    productId: number;
    img: {src: string; alt: string};
    price: number | [number, number];
    name: string;
    desc: string;
    link: string;
    stock: number | null;
    option?: boolean;
    unit: string;
    shippingCost: IShippingCost;
    category: string;
    popularity: number;
    sku: string;
}

export default function ProductCard({id, productId, img, price, name, desc, link, stock, option, unit, shippingCost, popularity, category, sku}: IProductCardProps) {
    const {state, dispatch} = useContext(CartContext);
    const {state:shipping, dispatch:shippingDispatch} = useContext(ShippingContext);
    const router = useRouter();

    const [cart, setCart] = useState<CartType[]>([]);

    useEffect(() =>{
        setCart(state);
    }, [state])

    function isProductAdded () : boolean {
        const addedCart = cart.find((cartItem) => cartItem?.id == id);

        if(addedCart) {
            return true;
        }

        return false;
    }

    async function addToCart () {
        if(isProductAdded() || option) {
            router.push(link)
            return;
        }

        if((typeof(price) === "object")) {
            return;
        }

        const url = API_URL + `/products/${productId}`
        await axios.put(url, {data: {popularity: popularity + 1}});


        shippingDispatch({type: ShippingTypes.Add, payload: shippingCost})
        dispatch({type: Types.Add, payload: {id, img, price, name, link, quantity : 1, shippingId: shippingCost.id, category, sku}})
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

    <div className="p-4 flex flex-col justify-between flex-1">
        <div>
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
        </div>
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
