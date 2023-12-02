"use client";

import CouponForm from "@/forms/CouponForm";
import { CartContext } from "@/providers/CartProvider";
import { getCartTotal } from "@/utils/cartTotal";
import Image from "next/image";
import { useContext, useState } from "react";

interface IOrder {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export default function OrderDetails() {
    const {state} = useContext(CartContext);

    const subtotal = getCartTotal(state);
    const shipping = 0;
    const tax = 4.67;
    const total = subtotal + shipping + tax;

    if(state.length === 0) {
        return null;
    }

  return (
    <div className="mb-6 ">
        <div>
            <div className="mt-8 pt-8 border-t lg:border-t-0">
            <h3 className="font-bold text-gray-darker text-2xl mb-2 lg:hidden">Order summary</h3>
                {
                    state.map(cartItem => {
                        const {id, img, name, quantity, price} = cartItem
                        
                        return (
                            <div key={id} className="mb-4 flex items-center">
                                <div className="w-16 h-16 block border-2 relative">
                                    <Image 
                                        width="300" 
                                        height="300" 
                                        src={img?.src ?? ''} 
                                        className="w-full h-full object-cover object-center" 
                                        alt={img?.alt ?? ''} 
                                        loading="lazy" />

                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full text-white text-center">
                                        <span className="text-sm leading-6">{quantity ?? 0}</span>
                                    </div>
                                </div>						
                                
                    
                                <div className=" p-4 flex-1 text-center md:text-left">
                                    <span className="text-sm  text-black hover:text-primary">{name}</span>					
                                </div>

                                <div className="text-black  p-4">
                                    <span>${((quantity ?? 0) * (price ?? 0)).toFixed(2)}</span>						
                                </div>
                            </div>
                        )
                    })
                }
            </div>
            
            <div className="my-8">
                <Coupon />
            </div>

            <div className="text-black text-sm">
                <div className="flex justify-between gap-2 my-1.5">
                    <span>Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2 my-1.5">
                    <span>Shipping</span>
                    <span className="text-xs text-gray-text">Enter shipping address</span>
                </div>
                <div className="flex justify-between gap-2 my-1.5">
                    <span>Tax</span>
                    <span>${tax}</span>
                </div>
                <div className="flex justify-between gap-2 my-1.5 font-semibold text-base">
                    <span className="">Total</span>
                    <span>${total}</span>
                </div>
            </div>
        </div>
    </div>
  )
}

function Coupon () {
    const [coupon, setCoupon] = useState('');
    return (
        <div className="flex gap-4 flex-col md:flex-row">
            <input 
                type="text" 
                name="coupon_code" 
                className="flex-1 border-1 border-gray/20 text-gray-darker py-[12px] px-[11px] rounded-[5px] focus:border-primary focus:ring-primary placeholder:text-black/30" 
                
                value={coupon}
                placeholder="Coupon code"
                onChange={(e) => setCoupon(e.target.value)}
            /> 
            <button 
                type="submit" 
                className="block flex-2 bg-primary hover:bg-gray-darker disabled:bg-gray disabled:cursor-not-allowed lg:mt-0 text-center py-[12px] px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase transition-colors duration-500 ease-in-out" 
                name="apply_coupon" 
                value="Apply coupon"
                disabled={!coupon}
                >
                Apply 
            </button>
        </div>
    )
}