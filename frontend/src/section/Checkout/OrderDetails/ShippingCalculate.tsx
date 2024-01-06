import { useContext, useEffect, useState } from "react";
import { ShippingContext } from "@/providers/ShippingProvider";
import ShippingTotal from "./ShippingTotal";
import { OrderContext, OrderTypes } from "@/providers/OrderProvider";
import { API_URL } from "@/api/constants";
import axios from "axios";
import { getFromStore } from "@/utils/localStorage";





export default function ShippingCalculate ({shippingCost, subTotal, tax, discount}: {shippingCost: number; subTotal: number; tax: number; discount: number;}) {


    return (
        <>
            {discount ? <div className="flex justify-between gap-2 my-2">
                <span>Discount</span>
                <span>-${discount}</span>
            </div> : null}

            <Shipping shippingCost={shippingCost} />

            <TaxCalculate />

            <ShippingTotal 
                discount={discount}
                tax={tax}
                subTotal={subTotal}
                shippingCost={shippingCost}
                />
            </>
    )
}

function Shipping ({shippingCost} : {shippingCost: number}) {
    // const [shippingCost, setShippingCost] = useState(order.shippingCost ?? 0);
    // const {state:shipping} = useContext(ShippingContext);
    

    // useEffect(() => {
    //     if(order.shippingCost) {
    //         setShippingCost(order.shippingCost)
    //         return;
    //     }

    //     setShippingCost((_) => {
    //         return calculateShipping()
    //     });
        
    //     function calculateShipping () {
    //         if(order?.pickupEnabled) {
    //             return 0
    //         }

    //         if(shipping.length === 0) {
    //             return order?.shippingCost ?? 0
    //         }

    //         const data = shipping.map(item => {

    //             if(item?.type === "distance") {
    //                 return order?.shippingCost ?? 0;
    //             }
            
    //             // if there is no available outside delivery
    //             if(item?.onlyLocally === true) {
    //                 return item.localRate ?? 0
    //             }

    //             // if user choose the local area even the outside delivery is available
    //             if(!item?.onlyLocally && order?.state === localArea) {
    //                 return item?.localRate ?? 0
    //             }
    
                
    //             // if the user choose outside area, then get the cost of outside delivery
    //             return item?.outsideRate ?? 0
    
    //         }).sort((a, b) => b - a)[0]
            
    //         return data;
    //     }

    // }, [shipping])

    // useEffect(() => {
    //     dispatch({type: OrderTypes.Update, payload: {shippingCost: shippingCost}})
    // }, [ shippingCost, dispatch])

    return (
        <div className="flex justify-between items-end gap-2 my-2">
                <span>Shipping</span>

                <div className="text-right">
                    {/* {shippingCost?.msg && <><span className="text-gray-text text-sm mb-2" >
                        {shippingCost.msg}
                    </span><br /></>} */}
                    <span className="font-semibold">{`$${shippingCost?.toFixed(2) ?? 0}` ?? <span className="text-xs text-gray-text font-semibold">Enter shipping address</span>}</span>
                </div>
                {/* <div>{order.shippingCost}</div> */}
            </div>
    )
}

function TaxCalculate () {
    const {state:order} = useContext(OrderContext);
    
    return (
        <div className="flex justify-between gap-2 my-2">
            <span>Tax</span>
            <span>${order?.tax ?? 0}</span>
        </div>
    )
}