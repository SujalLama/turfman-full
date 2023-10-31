"use client";

import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";

const selectData = [
    {value:"",name: "Select an option…"},
    {value:"ACT",name: "Australian Capital Territory"},
    {value:"NSW",name: "New South Wales"},
    {value:"NT",name: "Northern Territory"},
    {value:"QLD",name: "Queensland"},
    {value:"SA",name: "South Australia"},
    {value:"TAS",name: "Tasmania"},
    {value:"VIC",name: "Victoria"},
    {value:"WA",name: "Western Australia"},
];

export default function BillingForm() {
  return (
    <>
        <h3 className="font-bold text-gray-darker text-[28px] mb-4">Billing details</h3>
        <form className="mb-7.5">

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_first_name" className="mb-2 inline-block">First name&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="billing_first_name" 
                        placeholder="" 
                        value=""
                        error=""
                        onChange={() => {}} 
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
                        onChange={() => {}} 
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
                        onChange={() => {}} 
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
                        onChange={() => {}} 
                    />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_state" className="mb-2 inline-block">State&nbsp;<span className="text-red" title="required">*</span></label>

                    <Select 
                        options={selectData} 
                        onChange={() => {return ""}} 
                        value="" 
                        name="billing_state" 
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
                        onChange={() => {}} 
                    />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_phone" className="mb-2 inline-block">Phone&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text"
                        name="billing_phone" 
                        placeholder="" 
                        value="" 
                        error=""
                        onChange={() => {}} 
                    />
                </div>
    
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_email" className="mb-2 inline-block">Email address&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="email" 
                        name="billing_email" 
                        placeholder="" 
                        value="" 
                        error=""
                        onChange={() => {}} 
                    />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_clientabn" className="mb-2 inline-block">Client ABN&nbsp;
                        <span className="optional">(optional)</span></label>
                    <Input 
                        type="text" 
                         name="billing_clientabn" 
                         placeholder="Client ABN" 
                         value="" 
                         error=""
                         onChange={() => {}} 
                    />
                </div>
    
                <div className="mb-4 md:w-1/2 md:mx-8">                
                    <label htmlFor="billing_ordernotes" className="mb-2 inline-block">Order notes
                        <span className="optional">(optional)</span></label>
                    <Textarea
                        name="billing_clientabn"
                        placeholder="Notes about your order, e.g. special notes for delivery."  
                    />
                </div>
            </div>
        </form>
    </>
  )
}
