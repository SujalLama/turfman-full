"use client";

import Image from "next/image";
import { useContext } from "react";
import OrderDetailsCard from "./OrderDetailsCard";
import { OrderContext } from "@/providers/OrderProvider";


export default function OrderDetails({
    loading,
    }: {
        loading: boolean;
    }) {
      const {state:order} = useContext(OrderContext);

    if(!order?.products?.length) {
        return null;
    }

  return (
    <div className="mb-6 ">
        <div>
            <div className="lg:mt-14 pt-6 lg:pt-0 border-t lg:border-t-0">
                <h3 className="font-bold text-gray-darker text-2xl mb-4 lg:hidden">Order summary</h3>
                {
                    order.products.map(cartItem => {
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
                
            <OrderDetailsCard 
                loading={loading}
            />
        </div>
    </div>
  )
}
