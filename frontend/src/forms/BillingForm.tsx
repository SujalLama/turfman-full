"use client";

import DeliveryDate from "@/components/DeliveryDate";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";
import { localPostCodes } from "@/data/postcodes";
import { ShippingContext } from "@/providers/ShippingProvider";
import { IDelivery, IDeliveryAddress, IError } from "@/section/CheckoutSection";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";

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

const localStateOptions = [
    {value:"",name: "Select an option…"},
    {value:"WA",name: "Western Australia"},
]


export default function BillingForm({delivery, deliveryAddress, setDelivery, setDeliveryAddress, formError, setFormError, loading}: {
    delivery: IDelivery;
    deliveryAddress: IDeliveryAddress;
    setDelivery: Dispatch<SetStateAction<IDelivery>>;
    setDeliveryAddress: Dispatch<SetStateAction<IDeliveryAddress>>;
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
}) {

    const {state:shipping} = useContext(ShippingContext);
    const [stateOptions, setStateOptions] = useState<{value: string; name: string;}[]>([]);

    useEffect(() => {
        if(shipping.some(item => item.onlyLocally)) {
            setStateOptions(localStateOptions);
        } else {
            setStateOptions(selectData);
        }
    }, [shipping])


    const checkPostCode = (e: ChangeEvent<HTMLInputElement>) => {

        if(Object.values(localPostCodes).includes(e.target.value)) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, postcode: ''}});
        } else {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, postcode: 'Wrong Postcode'}});
        }
    }

    
  return (
    <>
    
    <div className="mb-6">
        <h3 className="font-bold text-gray-darker text-2xl mb-2">Delivery / Pickup</h3>
        <p className="text-sm">Please note: We only deliver small products outside western australia. Also, we only deliver diy / rented products inside the distance of 50km from our base location.</p>
    </div>
    

    <div className="flex items-center mb-4">
            <label htmlFor="pickupEnable" className="text-sm mr-2 text-black">
                Local Pickup:
            </label>
                <div 
                    className={`w-10 h-5 p-1 rounded-full relative border cursor-pointer ${delivery.pickupEnabled ? 'bg-primary' : 'bg-white'}`} 
                    onClick={() => setDelivery({...delivery, pickupEnabled: !delivery.pickupEnabled})}>
                    <span className={`block w-5 h-5 rounded-full bg-gray absolute top-0 ${delivery.pickupEnabled ? 'right-0' : 'left-0'}`}></span>
                </div>
        </div>
        
        {delivery.pickupEnabled ? <div className="mb-8">

            <div className="md:flex md:-mx-2">
                
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="delivery_date" className="mb-1 inline-block text-sm">Pickup Date&nbsp;</label><br />
                    <DeliveryDate 
                        onChange={(date : Date | null) => setDelivery({...delivery, pickupDate: date})} 
                        disabled={loading}
                        error={formError.pickupDate}
                    />
                </div>
            </div>
            
        </div> :
        <div className="mb-8">

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="billing_state" className="mb-1 inline-block text-sm">State&nbsp;<span className="text-red" title="required">*</span></label>

                    <Select 
                        options={stateOptions} 
                        onChange={(e) => {
                            setDeliveryAddress((prev) => ({...prev, state: e.target.value}))
                            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, state: ''}})
                        }} 
                        defaultValue={stateOptions[0]?.value}
                        value={deliveryAddress.state} 
                        name="state"
                        error={formError.deliveryAddress.state}
                        className="!mb-0"
                        disabled={loading}
                    />
                </div>
    
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="postcode" className="mb-1 inline-block text-sm">Postcode&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="postcode" 
                        placeholder="" 
                        value={deliveryAddress.postcode} 
                        error={formError.deliveryAddress.postcode}
                        disabled={loading}
                        
                        onChange={(e) => {
                            setDeliveryAddress((prev) => ({...prev, postcode: e.target.value}))
                            
                            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, postcode: ''}})
                            // checkPostCode(e);
                        }} 
                    />
                </div>
            </div>

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="street" className="mb-1 inline-block text-sm">Street address&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text"
                        name="street" 
                        
                        value={deliveryAddress.street} 
                        error={formError.deliveryAddress.street}
                        disabled={loading}
                        onChange={(e) => {

                            setDeliveryAddress((prev) => ({...prev, street: e.target.value}))
                            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, street: ''}})
                        }} 
                        />
                </div>
                
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="city" className="mb-1 inline-block text-sm">City&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text"
                        name="city" 
                        placeholder=""
                        value={deliveryAddress.city} 
                        error={formError.deliveryAddress.city}
                        disabled={loading}
                        onChange={(e) => {

                            setDeliveryAddress((prev) => ({...prev, city: e.target.value}))
                            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, city: ''}})
                        }} 
                    />
                </div>
            </div>

            <div className="md:flex">
                <div className="mb-3 md:w-[calc(50%_-_0.5rem)]">
                    <label htmlFor="delivery_date" className="mb-1 inline-block text-sm">Delivery Date&nbsp;</label><br />
                    <DeliveryDate 
                        onChange={(date : Date | null) => setDelivery((prev) => ({...prev, deliveryDate: date}))} 
                        disabled={loading}
                        error={formError.deliveryDate}
                    />
                </div>
            </div>

            <div>
                <label htmlFor="delivery_notes" className="mb-1 inline-block text-sm">Special notes to Driver&nbsp;</label>
                <Textarea  onChange={(e) => setDelivery((prev) => ({...prev, deliveryNotes: e.target.value}))} disabled={loading} />
            </div>

            
        </div>}
    </>
  )
}
