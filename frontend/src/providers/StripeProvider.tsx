"use client";

import { API_URL } from "@/api/constants";
import getStripe from "@/utils/getStripe";
import { Elements } from "@stripe/react-stripe-js";
import { Stripe } from "@stripe/stripe-js";
import axios from "axios";
import { PropsWithChildren, useContext, useEffect, useState } from "react";
import { OrderContext } from "./OrderProvider";


export default function StripeProvider ({children}: PropsWithChildren) {
    const [clientSecret, setClientSecret] = useState('');
    const [stripe, setStripe] = useState<Stripe | null>(null);
    const {state:order} = useContext(OrderContext);

    useEffect(() => {
        
        (async function () {
            const url = API_URL + '/payment-intent';
            
            const stripe = await getStripe();

            if(!order.total) {
                return;
            }


            const {data} = await axios.post(url, {data: {
                paymentMethod: "stripe",
                order: {
                    total : (order.total * 100).toFixed(2)
                }
            }});

            if(!data) {
                return
            }
            
            setStripe(stripe);
            setClientSecret(data?.clientSecret)
            
        })()
    }, [order])

    return (
        <Elements stripe={stripe} options={{clientSecret}}>
            {children}
        </Elements>
    )
}