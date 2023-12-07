"use client";

import CouponForm from "@/forms/CouponForm";
import { CartContext, CartType } from "@/providers/CartProvider";
import { IOrder } from "@/section/CheckoutSection";
import { getCartTotal } from "@/utils/cartTotal";
import { IShippingCost } from "@/utils/dataFormatter";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useEffect, useMemo, useState } from "react";


const localArea = 'ACT';

export default function OrderDetails({order, setOrder}: {order: IOrder; setOrder: Dispatch<SetStateAction<IOrder>>}) {
    
    const [cart, setCart] = useState<CartType[]>([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState<(IShippingCost | undefined)[]>([]);
    const {state} = useContext(CartContext);

    useEffect(() => {
        setCart(state);
        setCartTotal(getCartTotal(state));
        setShippingCost(state?.map((item) => item?.shippingCost));
    }, [state])

    const tax = 4.67;

    const calculatedShippingCost = useMemo(
        () =>  {

            const data = shippingCost.map(item => {
            
                // if there is no available outside delivery
                if(item?.isAvailableOutside === false) {
                    return item.localCost ?? 0
                }

                // if user choose the local area even the outside delivery is available
                if(!order.deliveryAddress.state || order.deliveryAddress.state === localArea) {
                    return item?.localCost ?? 0
                }
    
                
                // if the user choose outside area, then get the cost of outside delivery
                return item?.outsideCost ?? 0;
    
            }).sort((a, b) => b - a)[0]

            return data;
        }
        
    
    , [shippingCost, order])

    useEffect(() => {
        setOrder({...order, total: calculatedShippingCost + cartTotal + tax, subTotal: cartTotal, shippingCost: calculatedShippingCost, tax: tax})
    }, [calculatedShippingCost])

    if(cart.length == 0) {
        return null;
    }


  return (
    <div className="mb-6 ">
        <div>
            <div className="lg:mt-14 pt-6 lg:pt-0 border-t lg:border-t-0">
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
                                    <span className="text-sm  text-black">{name}</span>					
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
                    <span className="font-semibold">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between gap-2 my-1.5">
                    <span>Shipping</span>
                    {`$${calculatedShippingCost.toFixed(2)}` ?? <span className="text-xs text-gray-text">'Enter shipping address'</span>}
                </div>
                <div className="flex justify-between gap-2 my-1.5">
                    <span>Tax</span>
                    <span>${tax}</span>
                </div>
                <div className="flex justify-between gap-2 my-1.5 font-semibold text-base">
                    <span className="">Total</span>
                    <span>${(calculatedShippingCost + cartTotal + tax).toFixed(2)}</span>
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