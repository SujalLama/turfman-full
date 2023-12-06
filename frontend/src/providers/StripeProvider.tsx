"use client";

import { API_URL } from "@/api/constants";
import getStripe from "@/utils/getStripe";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import axios from "axios";
import { PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react";
import { CartContext } from "./CartProvider";
import { getCartTotal } from "@/utils/cartTotal";

export default function StripeProvider ({children}: PropsWithChildren) {
    const [clientSecret, setClientSecret] = useState('');
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const {state} = useContext(CartContext);

    useEffect(() => {
        const subtotal = getCartTotal(state);
        const shipping = 100;
        const tax = 4.67;
        const total = subtotal + shipping + tax;
        
        (async function () {
            const url = API_URL + '/stripe-payment-intent';
            
            const stripe = await getStripe();

            if(!state) {
                return;
            }

            const {data} = await axios.post(url, {data: {total}});

            
            if(data) {
                setStripe(stripe);
                setClientSecret(data?.clientSecret)
            }
        })()
    }, [state])

    return (
        <Elements stripe={stripe} options={{clientSecret}}>
            {children}
        </Elements>
    )
}