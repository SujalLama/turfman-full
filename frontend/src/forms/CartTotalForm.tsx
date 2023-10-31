"use client";

import { CartContext } from "@/providers/CartProvider";
import FaIcons from "@/components/FaIcons";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { getCartTotal } from "@/utils/cartTotal";
import Link from "next/link";
import { useContext, useState } from "react";

const countries = [{name: "Select a country / region", value: "default"}, {name: "Australia", value: "AU"}];
const region = [
    {name: "Select an option", value: "default"}, 
    {name: "Australian Capital Territory", value: "ACT"},
    {value:"ACT", name: "Australian Capital Territory"},
    { value:"NSW", name: "New South Wales"},
    { value:"NT", name: "Northern Territory"},
    { value:"QLD", name: "Queensland"},
    { value:"SA", name: "South Australia"},
    { value:"TAS", name: "Tasmania"},
    { value:"VIC", name: "Victoria"},
    { value:"WA", name: "Western Australia"},
];

export default function CartTotalForm() {
    const [showShippingInfo, setShowShippingInfo] = useState(false);
    const {state} = useContext(CartContext);
    const gst = 1.91;
    const shippingCost = 0;

    const total = getCartTotal(state);

    if(state.length == 0) {
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
                            total.toFixed(2)}</bdi></span>
                        </td>
                    </tr>

                    <tr className="">
                        <th className="border px-4 py-2">Shipping</th>
                        <td className="border px-4 py-2">
                            Enter your address to view shipping options.
                            
                            <form>
                                <button type="button" className="my-2 inline-block underline hover:text-primary" onClick={() => setShowShippingInfo(!showShippingInfo)}>Calculate shipping <FaIcons icon="faArrowDown"/></button>
                                {showShippingInfo && <div>
                                    <div className="lg:flex lg:justify-between mb-2">
                                        <label className="w-1/2">Country / region:</label>
                                        <Select 
                                            name="calc_shipping_country" 
                                            value="" 
                                            options={countries}
                                            onChange={() => {return ''}}
                                            className="lg:flex-1"
                                        />
                                    </div>
                                    <div className="lg:flex lg:justify-between mb-2">
                                        <label className="w-1/2">State&nbsp;</label>
                                        <Select 
                                            name="region" 
                                            value="" 
                                            options={region}
                                            onChange={() => {return ''}}
                                            className="lg:flex-1"
                                        />
                                    </div>
                                    <div className="lg:flex lg:justify-between mb-2">
                                        <label className="w-1/2">Suburb&nbsp;</label>
                                        <Input 
                                            type="text" 
                                            className="lg:flex-1" 
                                            value="" 
                                            placeholder="City" 
                                            name="calc_shipping_city" 
                                            error="" 
                                            onChange={() => {}}
                                        />

                                    </div>
                                    <div className="lg:flex lg:justify-between">
                                        <label className="w-1/2">Postcode&nbsp;</label>
                                        <Input 
                                            type="text" 
                                            className="lg:flex-1" 
                                            value="" 
                                            placeholder="Postcode / ZIP" 
                                            name="calc_shipping_postcode" 
                                            error="" 
                                            onChange={() => {}} 
                                            />
                                    </div>
                                
                                </div>}
                            </form>

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
                        <th className="border px-4 py-2">Total</th>
                        <td className="border px-4 py-2">
                            <strong>
                                ${(total + gst + shippingCost).toFixed(2)}
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
        
            <Link 
                href="/checkout" 
                className="block bg-primary hover:bg-gray-darker text-center py-4 
                px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase w-full transition-colors 
                duration-500 ease-in-out">
                Proceed to checkout
            </Link>
        </div>
    </section>
  )
}
