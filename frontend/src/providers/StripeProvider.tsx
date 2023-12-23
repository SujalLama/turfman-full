"use client";

import { API_URL } from "@/api/constants";
import getStripe from "@/utils/getStripe";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import axios from "axios";
import { PropsWithChildren, useEffect, useState } from "react";


export default function StripeProvider ({children, total}: PropsWithChildren<{total: number}>) {
    const [clientSecret, setClientSecret] = useState('');
    const [stripe, setStripe] = useState<Stripe | null>(null);

    useEffect(() => {
        
        (async function () {
            const url = API_URL + '/payment-intent';
            
            const stripe = await getStripe();

            if(!total) {
                return;
            }


            const {data} = await axios.post(url, {data: {
                paymentMethod: "stripe",
                order: {
                    total : (total * 100).toFixed(2)
                }
            }});

            if(!data) {
                return
            }
            
            setStripe(stripe);
            setClientSecret(data?.clientSecret)
            
        })()
    }, [total])

    return (
        <Elements stripe={stripe} options={{clientSecret}}>
            {children}
        </Elements>
    )
}