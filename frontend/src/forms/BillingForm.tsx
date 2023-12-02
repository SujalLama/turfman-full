"use client";

import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import { IOrder } from "@/section/CheckoutSection";
import { Dispatch, SetStateAction } from "react";

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

export default function BillingForm({order, setOrder}: {order: IOrder; setOrder: Dispatch<SetStateAction<IOrder>>}) {
  return (
    <>
        <h3 className="font-bold text-gray-darker text-2xl mb-4">Delivery</h3>
        <form className="mb-8">

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="billing_state" className="mb-1 inline-block text-sm">State&nbsp;<span className="text-red" title="required">*</span></label>

                    <Select 
                        options={selectData} 
                        onChange={(e) => {setOrder({...order, deliveryAddress: {...order.deliveryAddress, state: e.target.value}})}} 
                        value={order.deliveryAddress.state} 
                        name="state" 
                        className="!mb-0"
                    />
                </div>
    
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="postcode" className="mb-1 inline-block text-sm">Postcode&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="postcode" 
                        placeholder="" 
                        value={order.deliveryAddress.postcode} 
                        error=""
                        onChange={(e) => {setOrder({...order, deliveryAddress: {...order.deliveryAddress, postcode: e.target.value}})}} 
                    />
                </div>
            </div>

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="street" className="mb-1 inline-block text-sm">Street address&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text"
                        name="street" 
                        placeholder="House number and street name" 
                        value={order.deliveryAddress.street} 
                        error=""
                        required
                        onChange={(e) => {setOrder({...order, deliveryAddress: {...order.deliveryAddress, street: e.target.value}})}} 
                        />
                </div>
                
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="city" className="mb-1 inline-block text-sm">City&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text"
                        name="city" 
                        placeholder=""
                        value={order.deliveryAddress.city} 
                        error=""
                        onChange={(e) => {setOrder({...order, deliveryAddress: {...order.deliveryAddress, city: e.target.value}})}} 
                    />
                </div>
            </div>

            
        </form>
    </>
  )
}
