"use client";

import FaIcons from "@/components/FaIcons";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { useState } from "react";

const selectOption = [
    {value:"", name: "Select an option…"},
    {value:"ACT", name: "Australian Capital Territory"},
    {value:"NSW", name: "New South Wales"},
    {value:"NT", name: "Northern Territory"},
    {value:"QLD", name: "Queensland"},
    {value:"SA", name: "South Australia"},
    {value:"TAS", name: "Tasmania"},
    {value:"VIC", name: "Victoria"},
    {value:"WA", name: "Western Australia"},
];

export default function ShippingForm() {
    const [showShippingInfo, setShowShippingInfo] = useState(false);
  return (
    <>
        <button className="font-bold text-gray-darker text-[28px] mb-4 underline hover:text-primary" onClick={() => setShowShippingInfo(!showShippingInfo)}>
            Ship to Different Delivery address
            <FaIcons icon="faArrowDown" className="text-base ml-2"/>
        </button>
        {showShippingInfo && <form className="mb-7.5">
            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_first_name" className="mb-2 inline-block">First name&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="billing_first_name" 
                        placeholder="" 
                        value=""
                        error=""
                        onChange={()=>{}} 
                    />
                </div>
    
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_company" className="mb-2 inline-block">Company name&nbsp;
                        <span className="optional">(optional)</span></label>
                    <Input 
                        type="text" 
                        name="billing_company" 
                        placeholder="" 
                        value=""
                        error=""
                        onChange={()=>{}}  
                    />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_address_1" className="mb-2 inline-block">Street address&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="billing_address_1" 
                        placeholder="House number and street name" 
                        value=""
                        error=""
                        onChange={()=>{}} 
                    />
                </div>
                
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_city" className="mb-2 inline-block">Suburb&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="billing_city" 
                        placeholder="" 
                        value=""
                        error=""
                        onChange={()=>{}} 
                    />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_state" className="mb-2 inline-block">State&nbsp;<span className="text-red" title="required">*</span></label>
                    <Select name="billing_state" options={selectOption} value="" onChange={() => ""} 
                    />
                </div>
    
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_postcode" className="mb-2 inline-block">Postcode&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text"  
                        name="billing_postcode" 
                        placeholder="" 
                        value=""
                        error=""
                        onChange={()=>{}} 
                    />
                </div>
            </div>
        </form>}
    </>
  )
}
