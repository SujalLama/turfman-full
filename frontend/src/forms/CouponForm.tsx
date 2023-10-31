"use client";

import FaIcons from "@/components/FaIcons";
import { useState } from "react";

export default function CouponForm() {
    const [showForm, setShowForm] = useState(false);

  return (
    <>
        <div className="p-7.5 border-t-[3px] border-primary bg-gray/10 mb-8 flex">
            <FaIcons icon="faCartShopping" className="mr-3 text-primary"/>
            <span className="text-gray-darker -mt-1">Have a coupon? 
            <button className="hover:underline ml-2" onClick={() => {setShowForm(!showForm)}}>Click Here to enter your code.</button></span>
        </div>

        {showForm && <div className="p-5 mb-8 border rounded-[5px] max-w-[600px]">
            <p className="mb-5">If you have a coupon code, please apply it below.</p>
            <div className="lg:flex">
                <input type="text" name="coupon_code" className="w-full border-1 lg:mr-4 border-gray/20 text-gray-darker py-4 px-7.5 rounded-[5px] focus:border-primary focus:ring-primary placeholder:text-black/30" id="coupon_code" value="" placeholder="Coupon code" /> 
                <button type="submit" className="block bg-primary hover:bg-gray-darker mt-1 lg:mt-0 text-center py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase w-full transition-colors duration-500 ease-in-out" name="apply_coupon" value="Apply coupon">Apply coupon</button>
            </div>
        </div>}
    </>
  )
}
