"use client";

import { CartContext, CartType } from "@/providers/CartProvider";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import { getCartTotal } from "@/utils/cartTotal";
import { Dispatch, useContext, useEffect, useMemo, useState } from "react";
import CheckoutButton from "@/components/CheckoutButton";
import Shipment from "./Shipment";
import DeliveryDate from "./DeliveryDate";
import { IShippingCost } from "@/utils/dataFormatter";

const localArea = 'Western Australia';

export interface IShipmentDetail {
    state: string;
    postCode: string;
    city: string;
}

export default function CartTotalForm() {
    const [cart, setCart] = useState<CartType[]>([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [shippingCost, setShippingCost] = useState<(IShippingCost | undefined)[]>([]);
    const {state} = useContext(CartContext);
    const gst = 1.91;
    const [shippingDetail, setShippingDetail] = useState<IShipmentDetail>({state: '', postCode: '', city: ''});
    

    useEffect(() => {
        setCart(state);
        setCartTotal(getCartTotal(state));
        
        setShippingCost(state?.map((item) => item?.shippingCost));
    }, [state])


    if(cart.length == 0) {
        return null;
    }

  return (
    <section className=" my-10 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <div className="lg:w-[60%] mb-6 ">
            <h2 className="font-bold text-gray-darker text-[28px] mb-6">Cart totals</h2>

            <table className="w-full">

                <tbody>
                    <tr className="">
                        <th className="border px-4 py-2">Subtotal</th>
                        <td className="border px-4 py-2">
                            <span className=""><bdi><span className="">$</span>{
                            cartTotal.toFixed(2)}</bdi></span>
                        </td>
                    </tr>

                    <tr className="">
                        <th className="border px-4 py-2">Shipping</th>
                        <td className="border px-4 py-2">
                            Enter your address to view shipping options.
                            
                            <Shipment shippingDetail={shippingDetail} setShippingDetail={setShippingDetail} />

                        </td>
                    </tr>
                    <tr className="">
                        <th className="border px-4 py-2">Delivery / Pickup date</th>
                        <td className="border px-4 py-2">
                            Choose Delivery or Pickup date
                            <DeliveryDate />
                        </td>
                    </tr>

                    <tr>
                        <th className="border px-4 py-2">Coupon</th>
                        <td className="border p-4">
                            <div className="flex">
                                <Input 
                                    type="text" 
                                    name="coupon_code" 
                                    className="lg:mr-4" 
                                    value="" 
                                    placeholder="Coupon code"
                                    error=""
                                    onChange={() => {}}
                                /> 
                                <Button  name="Apply coupon" type="submit"/>
                            </div>
                        </td>
                    </tr>

                    <tr className="">
                        <th className="border px-4 py-2">Shipping Cost</th>
                        <td className="border px-4 py-2">
                            <ShipmentCost shippingCost={shippingCost} shippingDetail={shippingDetail} />
                        </td>
                    </tr>

                    <tr className="">
                        <th className="border px-4 py-2">Total</th>
                        <td className="border px-4 py-2">
                            <strong>
                                ${(cartTotal + gst).toFixed(2)}
                            </strong> 
                            <small>(
                                includes
                                $1.91 GST)
                            </small>
                        </td>
                    </tr>

                </tbody>
            </table>
        </div>

        <div className="lg:w-[60%]">
        
        <CheckoutButton products={cart} />
            
        </div>
    </section>
  )
}

function ShipmentCost ({
    shippingCost, 
    shippingDetail
    }: 
    {
        shippingCost : (IShippingCost | undefined)[], 
        shippingDetail: IShipmentDetail
    }) {
    
        

    const calculatedShippingCost = useMemo(
        () =>  {

            const data = shippingCost.map(item => {
            
                // if there is no available outside delivery
                if(item?.isAvailableOutside === false) {
                    return item.localCost ?? 0
                }

                // if user choose the local area even the outside delivery is available
                if(!shippingDetail.state || shippingDetail.state === localArea) {
                    return item?.localCost ?? 0
                }
    
                
                // if the user choose outside area, then get the cost of outside delivery
                return item?.outsideCost ?? 0;
    
            }).sort((a, b) => b - a)[0]

            return data;
        }
        
    
    , [shippingCost, shippingDetail])

    console.log(calculatedShippingCost);
    
    return (
        <strong>
            ${calculatedShippingCost}
        </strong>)
}