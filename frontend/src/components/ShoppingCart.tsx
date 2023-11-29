"use client";

import Image from "next/image";
import Link from "next/link";
import MessageBox from "./MessageBox";
import { useContext, useEffect, useState } from "react";
import { CartContext, CartType, Types } from "@/providers/CartProvider";
import Counter from "./Counter";
import { getCartTotal } from "@/utils/cartTotal";
import NavLink from "./NavLink";
import Textarea from "./forms/Textarea";
 
interface ICartTableProps {
    id: string;
    img: {src: string; alt: string;};
    link: string;
    name: string;
    price: number;
    quantity: number;
}


export default function ShoppingCart() {
    const {state} = useContext(CartContext);
    const [cart, setCart] = useState<CartType[]>([]);

    useEffect(() => {
        setCart(state)
    }, [state])

    if(cart.length === 0) {
        return (
            <div className="bg-gray-100">
                <div className="py-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
                    <MessageBox icon="faCartShopping" message="Your cart is empty" />
                    <Link 
                        href="/shop" 
                        className="inline-block bg-gray-darker text-center py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase  hover:bg-primary transition-colors duration-500 ease-in-out disabled:bg-gray-300 ">
                        Return to shop
                    </Link>
                </div>
            </div>
        )
    }

  return (
    <div className="bg-gray-100">
        <div className="py-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            <h2 className="font-bold text-gray-darker text-[28px] mb-8">Shopping Cart</h2>

            <div>
                <table className="bg-white w-full">
                    {
                    cart.map(cartItem => <CartItem key={cartItem.id} cart={cartItem} />) 
                    }
                </table>
            </div>

            <div className="mt-16 md:flex md:justify-between">
                
                <div className="flex-1 max-w-[600px]">
                    <h3 className="mb-1 text-sm font-light">Special notes for Delivery</h3>
                    <Textarea />
                </div>
                    
                
                <div className="md:ml-8 text-center md:text-right">
                    <h3 className="font-bold text-3xl text-black"> ${getCartTotal(cart).toFixed(2)}</h3>
                    <p className="text-sm font-light">Taxes and shipping calculated at checkout</p>

                    <NavLink 
                        name="Checkout" 
                        path="/checkout" 
                        className="py-4 px-7.5 text-sm  inline-block rounded-[5px] 
                        text-white tracking-[1px] font-bold uppercase  cursor-pointer transition-colors 
                        duration-500 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-400 bg-primary 
                        hover:bg-gray-darker mt-8 w-full md:w-auto" 
                        />
                </div>
            </div>
    </div>
  </div>
  )
}


function CartItem ({cart}: {cart: CartType}) {
    const {dispatch} = useContext(CartContext);
    const [addItem, setAddItem] = useState<number>(cart?.quantity ?? 0);

    const {id, link, img, name, price} = cart;



    function removeCartItem () {
        dispatch({type: Types.Remove, payload: {id}})
    }

    function onChangeHandler (activeValue: number) {
        
            setAddItem(activeValue)
            dispatch({type: Types.Update, payload: {id, quantity: activeValue}})
        
    }

    return (
        <tr key={id} className="border-b last:border-0 flex items-center flex-col md:flex-row">
            <td className=" p-3 md:p-6">
                <Link href={link ?? ''} className="w-32 h-40 block">
                    <Image 
                        width="300" 
                        height="300" 
                        src={img?.src ?? ''} 
                        className="w-full h-full object-cover object-center" 
                        alt={img?.alt ?? ''} 
                        loading="lazy" />
                </Link>						
            </td>
 
            <td className=" p-3 md:p-6 flex-1 text-center md:text-left">
                <Link href={link ?? ''} className="font-semibold text-xl text-black hover:text-primary">{name}</Link>
                <div className="text-sm mt-1 mb-2">
                    <label htmlFor="">Price :</label>
                    <span className="ml-2">${price?.toFixed(2) ?? 0}</span>
                </div>
                <button className="text-red hover:underline text-sm" onClick={removeCartItem}>
                    Remove
                </button>					
            </td>

            <td className=" p-3 md:p-6 flex-1 flex justify-center ">
                <Counter value={addItem} onChange={onChangeHandler} max={10} />
            </td>

            <td className=" p-3 md:p-6 ">
                <span>${((addItem ?? 0) * (price ?? 0)).toFixed(2)}</span>						
            </td>
        </tr>
    )
}

