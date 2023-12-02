"use client";

import { API_URL } from "@/api/constants";
import FaIcons from "@/components/FaIcons";
import OrderDetails from "@/components/OrderDetails";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import Textarea from "@/components/forms/Textarea";
import BillingForm from "@/forms/BillingForm";
import PaymentForm from "@/forms/PaymentForm";
import ShippingForm from "@/forms/ShippingForm";
import { CartContext, CartType } from "@/providers/CartProvider";
import StripeProvider from "@/providers/StripeProvider";
import getStripe from "@/utils/getStripe";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import axios, { AxiosError } from "axios";
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
}

export default function CheckoutSection() {
    const {state, dispatch} = useContext(CartContext);
    const [pageLoad, setPageLoad] = useState(true);
    const router = useRouter();
    const [order, setOrder] = useState<IOrder>({
        products: [],
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        deliveryAddress: {state: '', postcode: '', street: '', city: ''},
        paymentMethod: '',
        total: 0
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
            <div className="mt-8 lg:w-[55%] lg:py-20 lg:pr-8">
                <ContactDetail order={order} setOrder={setOrder} />
                <BillingForm order={order} setOrder={setOrder} />
                <PaymentForm order={order} setOrder={setOrder} />
            </div>
            <div className="lg:py-20  lg:w-[45%] lg:relative mb-8">
                <div className="lg:pl-16 lg:sticky lg:top-16">
                    <OrderDetails />
                </div>
            </div>
            <div className="hidden lg:block bg-gray-100 absolute top-0 right-0 w-[calc(45%_+_15px)] h-full -z-10 "></div>
        </div>
    
  )
}

function ContactDetail ({order, setOrder}: {order: IOrder; setOrder: Dispatch<SetStateAction<IOrder>>}) {
    return (
        <div>
            <h3 className="font-bold text-gray-darker text-2xl mb-4">Contact</h3>
            <form className="mb-8">

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="billing_first_name" className="mb-1 inline-block text-sm">First name&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="billing_first_name" 
                        placeholder="" 
                        value={order.firstName}
                        error=""
                        onChange={(e) => setOrder({...order, firstName: e.target.value})} 
                    />
                </div>
    
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="lastname" className="mb-1 inline-block text-sm">Last name&nbsp;<span className="text-red" title="required">*</span>
                        </label>
                    <Input 
                        type="text"
                        name="lastname" 
                        placeholder="" 
                        value={order.lastName} 
                        error=""
                        onChange={(e) => setOrder({...order, lastName: e.target.value})} 
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
                        error=""
                        onChange={(e) => setOrder({...order, email: e.target.value})} 
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
                        />
                </div>
            </div>
        </form>
        </div>
    )
}


