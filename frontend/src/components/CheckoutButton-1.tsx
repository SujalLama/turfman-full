"use client"

import Button from "./forms/Button"
import axios, { AxiosError } from "axios"
import { useContext, useState } from "react";
import { UserContext } from "@/providers/AuthProvider";
import getStripe from "@/utils/getStripe";
import { Link } from 'nextjs13-progress';

export default function CheckoutButton({products} : {products: any[]}) {
    
  return (
    <div className="flex gap-2">
        <CheckoutZipPay />
        <CheckoutAfterPay />
    </div>
    
  )
}

function CheckoutForm ({products} : {products: any[]}) {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const {state} = useContext(UserContext);
    
    const handlePayment = async () => {

        try {
            setError('');
            setLoading(true);
            
            const stripe = await getStripe();
            const session = await axios.post(process.env.NEXT_PUBLIC_API_BASE_URL + '/orders',{
                products: products,
                token: '',
                address: 'kathmandu',
                city: 'kathmandu',
                state: 'bagmati',
                amount: 300

            }, {
                headers: {
                    Authorization: `Bearer ${state?.token}`
                }
            })

            await stripe?.redirectToCheckout({sessionId: session.data.stripeSession.id})
            setLoading(false);
            
        } catch (error) {
            const {response } = error as AxiosError;
            const data = response?.data as any;

            const errorMessage = data.error.message as string;
            
            setError(errorMessage);
            setLoading(false);
        }
    }

    return <>
        {error && <p className="mb-4 text-center text-red">{error}</p>}
        {!state?.token && <p className="mb-4 text-center">Please <Link href="/login" className="underline hover:text-primary">Login</Link> to checkout</p>}
        <Button name="Proceed to Checkout" onClick={handlePayment} disabled={state?.token ? loading :  true}/>
    </>;
}

function CheckoutAfterPay () {
    return <Button name="Proceed to Checkout After Pay" onClick={() => {}} />
}

function CheckoutZipPay () {
    return <Button name="Proceed to Checkout Zip Pay" onClick={() => {}} />
}
