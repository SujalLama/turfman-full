"use client";

import DeliveryDate from "@/components/DeliveryDate";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";
import { localPostCodes } from "@/data/postcodes";
import { ShippingContext } from "@/providers/ShippingProvider";
import { ChangeEvent, Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import { IBillingAddress, IDeliveryAddress, IError, IShipping } from "./checkout.d";
import { OrderContext, OrderTypes } from "@/providers/OrderProvider";

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


export default function BillingForm({ formError, setFormError, loading}: {
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
}) {
    
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
        <h3 className="font-bold text-gray-darker text-2xl mb-2">Billing Address</h3>
    </div>
    
    <BillingAddress loading={loading} formError={formError} setFormError={setFormError} />

    </>
  )
}

function BillingAddress ({ formError, setFormError, loading}: {
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
}) {
    const {state:order, dispatch} = useContext(OrderContext);
    const {state:shipping} = useContext(ShippingContext);
    
    const [stateOptions, setStateOptions] = useState<{value: string; name: string;}[]>([]);
    const [billingAddress, setBillingAddress] = useState<IBillingAddress>({
        state: order.billState ?? '',
        postcode: order.billPostcode ?? '', 
        street: order.billStreet ?? '', 
        city: order.billCity ?? '',
    });

    useEffect(() => {
        if(shipping.some(item => item.onlyLocally)) {
            setStateOptions(localStateOptions);
        } else {
            setStateOptions(selectData);
        }
    }, [shipping])

    useEffect(() => {
        const {state, postcode, street, city} = billingAddress
        dispatch({type: OrderTypes.Update, payload: {billCity: city, billPostcode: postcode, billState: state, billStreet: street}})
    }, [dispatch, billingAddress])

    return (
        <div className="mb-8">

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="billing_state" className="mb-1 inline-block text-sm">State&nbsp;<span className="text-red" title="required">*</span></label>

                    <Select 
                        options={stateOptions} 
                        onChange={(e) => {
                            setBillingAddress((prev) => ({...prev, state: e.target.value}))
                            setFormError({...formError, billingAddress: {...formError.billingAddress, state: ''}})
                        }} 
                        defaultValue={stateOptions[0]?.value}
                        value={billingAddress.state} 
                        name="state"
                        error={formError.billingAddress.state}
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
                        value={billingAddress.postcode} 
                        error={formError.billingAddress.postcode}
                        disabled={loading}
                        
                        onChange={(e) => {
                            setBillingAddress((prev) => ({...prev, postcode: e.target.value}))
                            
                            setFormError({...formError, billingAddress: {...formError.billingAddress, postcode: ''}})
                            
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
                        
                        value={billingAddress.street} 
                        error={formError.billingAddress.street}
                        disabled={loading}
                        onChange={(e) => {

                            setBillingAddress((prev) => ({...prev, street: e.target.value}))
                            setFormError({...formError, billingAddress: {...formError.billingAddress, street: ''}})
                        }} 
                        />
                </div>
                
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="city" className="mb-1 inline-block text-sm">City&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text"
                        name="city" 
                        placeholder=""
                        value={billingAddress.city} 
                        error={formError.billingAddress.city}
                        disabled={loading}
                        onChange={(e) => {

                            setBillingAddress((prev) => ({...prev, city: e.target.value}))
                            setFormError({...formError, billingAddress: {...formError.billingAddress, city: ''}})
                        }} 
                    />
                </div>
            </div>
        </div>
    )
}

