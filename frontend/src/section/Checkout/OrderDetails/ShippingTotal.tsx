import { useContext, useEffect } from "react";
import { OrderContext, OrderTypes } from "@/providers/OrderProvider";

export default function ShippingTotal ({shippingCost, subTotal, tax, discount}: {shippingCost: number; subTotal: number; tax: number; discount: number;}) {
    const {dispatch} = useContext(OrderContext);
    
    
    useEffect(() => {
        dispatch({
            type: OrderTypes.Update, 
            payload: {total: subTotal + shippingCost + tax - discount}
        })
    }, [dispatch, subTotal, shippingCost, tax, discount]);

    
    return (
        <div className="flex justify-between gap-2 my-1.5 font-semibold text-base">
            <span className="">Total</span>
            <span>${(subTotal + shippingCost + tax - discount).toFixed(2) ?? 0}</span>
        </div>
    )
}
