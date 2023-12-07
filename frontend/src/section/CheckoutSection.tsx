"use client";

import OrderDetails from "@/components/OrderDetails";
import Input from "@/components/forms/Input";
import BillingForm from "@/forms/BillingForm";
import PaymentForm from "@/forms/PaymentForm";

import { CartContext, CartType } from "@/providers/CartProvider";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useLayoutEffect, useState } from "react";

export interface IDelivery {
    state: string; 
    postcode: string; 
    street: string; 
    city: string;
}

export interface IOrder {
    products: CartType[];
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryAddress: IDelivery,
    paymentMethod: string;
    total: number;
    subTotal: number;
    shippingCost: number;
    tax: number;
    deliveryDate: Date | null;
    pickupDate: Date | null;
    deliveryNotes: string;
}

export interface IError {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryAddress: IDelivery,
    payment: string;
}

export const initialError = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    deliveryAddress: {state: '', postcode: '', street: '', city: ''},
    payment: '',
    
}

export default function CheckoutSection() {
    const {state, dispatch} = useContext(CartContext);
    const [pageLoad, setPageLoad] = useState(true);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<IError>(initialError);

    const [order, setOrder] = useState<IOrder>({
        products: [],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        deliveryAddress: {state: '', postcode: '', street: '', city: ''},
        paymentMethod: '',
        total: 0,
        subTotal: 0,
        tax: 0,
        shippingCost: 0,
        deliveryDate: null,
        pickupDate: null,
        deliveryNotes: '',
    });
    

    useLayoutEffect(() => {
        if(state?.length === 0) {
          router.replace('/shop');
          
        } else {
            setOrder((prev) => ({...prev, products: state}))
            setPageLoad(false);
        }

      }, [router, state])

    

    if(pageLoad) {
        return <div>Loading...</div>
    }
    
  return (
    
        <div className="flex flex-col lg:flex-row">
            <div className="my-8 lg:my-12 lg:w-[55%]  lg:pr-8">
                <ContactDetail order={order} setOrder={setOrder} formError={formError} setFormError={setFormError} loading={loading} />
                <BillingForm order={order} setOrder={setOrder} formError={formError} setFormError={setFormError} loading={loading} />
                <PaymentForm order={order} setOrder={setOrder} formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading}/>
            </div>
            <div className="  lg:w-[45%] lg:relative mb-8">
                <div className="lg:pl-16 lg:sticky lg:top-6">
                    <OrderDetails order={order} setOrder={setOrder} />
                </div>
            </div>
            <div className="hidden lg:block bg-gray-100 absolute top-0 right-0 w-[calc(45%_+_15px)] h-full -z-10 "></div>
        </div>
    
  )
}

function ContactDetail ({order, setOrder, formError, setFormError, loading}: {
    order: IOrder; setOrder: Dispatch<SetStateAction<IOrder>>
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
}) {
    return (
        <div>
            <h3 className="font-bold text-gray-darker text-2xl mb-4">Contact</h3>
            <form className="mb-8">

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="billing_first_name" className="mb-1 inline-block text-sm">First name&nbsp;</label>
                    <Input 
                        type="text" 
                        name="billing_first_name" 
                        placeholder="" 
                        value={order.firstName}
                        onChange={(e) => setOrder({...order, firstName: e.target.value})}
                        disabled={loading}
                    />
                </div>
    
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="lastname" className="mb-1 inline-block text-sm">Last name&nbsp;
                        </label>
                    <Input 
                        type="text"
                        name="lastname" 
                        placeholder="" 
                        value={order.lastName} 
                        onChange={(e) => setOrder({...order, lastName: e.target.value})} 
                        disabled={loading}
                        />
                </div>
            </div>

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="email" className="mb-1 inline-block text-sm">Email&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="email" 
                        placeholder="" 
                        value={order.email}
                        error={formError.email}
                        onChange={(e) => {
                            setOrder({...order, email: e.target.value})
                            setFormError({...formError, email: ''})
                        }}
                        disabled={loading}
                    />
                </div>
    
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="phone" className="mb-1 inline-block text-sm">Phone&nbsp;
                        </label>
                    <Input 
                        type="text"
                        name="phone" 
                        placeholder="" 
                        value={order.phone}
                        error=""
                        onChange={(e) => setOrder({...order, phone: e.target.value})} 
                        disabled={loading}
                        />
                </div>
            </div>
        </form>
        </div>
    )
}


