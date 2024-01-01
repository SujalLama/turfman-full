"use client";

import { useContext } from "react";
import Coupon from "./Coupon";
import { OrderContext } from "@/providers/OrderProvider";
import ShippingCalculate from "./ShippingCalculate";


export default function OrderDetailsCard ({loading}: {
    loading: boolean;
}) {
    
    const {state:order} = useContext(OrderContext)

    return (
        <>
        <div className="my-8">
                    <Coupon 
                        formLoading={loading}
                        discount={order?.discount ?? 0} 
                        shippingCost={order?.shippingCost ?? 0} 
                        tax={order?.tax ?? 0} 
                        subTotal={order?.subTotal ?? 0} 
                    />
                </div>


                <div className="text-black text-sm">
                    <SubTotal subTotal={order?.subTotal ?? 0}  />

                    <ShippingCalculate
                        discount={order?.discount ?? 0} 
                        shippingCost={order?.shippingCost ?? 0} 
                        tax={order?.tax ?? 0} 
                        subTotal={order?.subTotal ?? 0} 
                    />
                    
                </div>
        </>
    )
}

function SubTotal ({subTotal}: {subTotal: number}) {
    

    return (
        <div className="flex justify-between gap-2 my-2">
            <span>Subtotal</span>
            <span className="font-semibold">${subTotal?.toFixed(2)}</span>
        </div>
    )
}
