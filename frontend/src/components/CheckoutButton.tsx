"use client";

import { useElements, useStripe } from "@stripe/react-stripe-js";
import { AxiosError } from "axios";
import { useState } from "react";

export default function CheckoutButton({className}: {className?: string}) {
    const [error, setError] = useState<string | undefined>('');
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    async function checkoutHandler () {
        try {
            setError('');
            
            if(!stripe || !elements) {
                return;
            }

            setLoading(true);

            const {error} = await stripe.confirmPayment({elements, confirmParams: {
                return_url: `${window.location.origin}?success`,
            }, redirect: "if_required"})

            if(error ) {
                setError(error.message);
            }
    
            setLoading(false);
        } catch(error) {
            const {response } = error as AxiosError;
            const data = response?.data as any;

            const errorMessage = data.error.message as string;
            
            setError(errorMessage);
            setLoading(false);
        }
    }

    return (
        <button 
            type="submit" 
            className={`bg-primary py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase w-full mt-8 cursor-pointer hover:bg-gray-darker transition-colors duration-500 ease-in-out ${className ?? ""}`}
            onClick={checkoutHandler}
            disabled={loading}
            >
            Make Order
        </button>
    )
}
