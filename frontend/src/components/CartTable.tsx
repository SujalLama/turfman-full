"use client";

import Image from "next/image";
import Link from "next/link";
import FaIcons from "./FaIcons";
import MessageBox from "./MessageBox";
import { ChangeEvent, useContext, useEffect, useState } from "react";
import { CartContext, CartType, Types } from "@/providers/CartProvider";
import Input from "./forms/Input";
 
interface ICartTableProps {
    id: string;
    img: {src: string; alt: string;};
    link: string;
    name: string;
    price: number;
    quantity: number;
}


export default function CartTable() {
    const {state} = useContext(CartContext);
    const [cart, setCart] = useState<CartType[]>([]);

    useEffect(() => {
        setCart(state)
    }, [state])

    if(cart.length === 0) {
        return (
            <>
                <MessageBox icon="faCartShopping" message="Your cart is empty" />
                <Link 
                    href="/shop" 
                    className="inline-block bg-gray-darker text-center py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase  hover:bg-primary transition-colors duration-500 ease-in-out disabled:bg-gray-300 ">
                    Return to shop
                </Link>
            </>
        )
    }

  return (
        <table className="w-full">
            <thead>
                <tr className="">
                    <th className="border text-left px-4 py-2">Thumbnail image</th>
                    <th className="border text-left px-4 py-2">Product</th>
                    <th className="border text-left px-4 py-2">Price</th>
                    <th className="border text-left px-4 py-2">Quantity</th>
                    <th className="border text-left px-4 py-2">Subtotal</th>
                    <th className="border text-left px-4 py-2">Remove item</th>
                </tr>
            </thead>
            <tbody>
                {
                    cart.map(cartItem => {
                        
                        return (
                            <CartTableItem key={cartItem.id} cart={cartItem} />
                        )
                    })
                }
                
            </tbody>
        </table>
  )
}


function CartTableItem ({cart}: {cart: CartType}) {
    const {dispatch} = useContext(CartContext);
    const [addItem, setAddItem] = useState<number>(cart?.quantity ?? 0);
    console.log(cart);

    const {id, link, img, name, price} = cart;



    function removeCartItem (id: number) {
        dispatch({type: Types.Remove, payload: {id}})
    }

    function onChangeHandler (e: ChangeEvent<HTMLInputElement>, id : number) {
        if(!e.target.value) {
            return;
        }
        const target = parseInt(e.target.value)

        
            setAddItem(target)
            dispatch({type: Types.Update, payload: {id, quantity: target}})
        
    }

    return (
        <tr key={id}>
            <td className="border px-4 py-2">
                <Link href={link ?? ''} className="w-25 h-25 block">
                    <Image 
                        width="300" 
                        height="300" 
                        src={img?.src ?? ''} 
                        className="w-full h-full object-cover object-center" 
                        alt={img?.alt ?? ''} 
                        loading="lazy" />
                </Link>						
            </td>

            <td className="border px-4 py-2">
                <Link href={link ?? ''}>{name}</Link>						
            </td>

            <td className="border px-4 py-2">
                <span>${price?.toFixed(2) ?? 0}</span>						
            </td>

            <td className="border px-4 py-2">
                <Input 
                    type="number" 
                    value={addItem} 
                    onChange={(e) => onChangeHandler(e, id)}
                    min={1}
                    max={10}
                />
            </td>

            <td className="border px-4 py-2">
                <span>${((addItem ?? 0) * (price ?? 0)).toFixed(2)}</span>						
            </td>

            <td className="border px-4 py-2 text-center">
                <button className="text-red text-3xl" onClick={() => removeCartItem(id)}>
                    <FaIcons icon="faXmark" />
                </button>
            </td>
        </tr>
    )
}