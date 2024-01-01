"use client";

import { API_URL } from "@/api/constants";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { errorHandler, makeOrder, updateOrderPayment } from "./PaymentForm";
import { ICheckoutButton, initialError } from "../checkout.d";
import { removeFromStore } from "@/utils/localStorage";
import { localStoreCartKey } from "@/providers/CartProvider";
import { localStoreShippingKey } from "@/providers/ShippingProvider";
import { useContext } from "react";
import { OrderContext } from "@/providers/OrderProvider";


export default function BankCheckoutButton({className, formError, setFormError, loading, setLoading}: ICheckoutButton) {
    const {state : order} = useContext(OrderContext);
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const router = useRouter();

    async function checkoutHandler () {
        console.log(order);
        try {
            setFormError(initialError);

            if(errorHandler(order, formError, setFormError)) {
                return;
            }


                setLoading(true);

                // order
                let data = null;

                if(orderId) {
                    const orderData = await updateOrderPayment({orderId: orderId, email: order?.email ?? '', paymentMethod: 'bankTransfer'});
                    data = {orderId: orderData.orderId}
                } else {
                    const orderData = await makeOrder(order);
                    data = {orderId: orderData.attributes.orderId}
                }


                if(!data) {
                    setFormError({...formError, payment: 'Order is not made'})
                    return;
                }


                removeFromStore(localStoreCartKey);
                removeFromStore(localStoreShippingKey);

                router.replace(`/checkout/success?order=${data.orderId}`)
    
            
        } catch(error) {
            const {response } = error as AxiosError;
            const data = response?.data as any;

            const errorMessage = data?.error?.message as string ?? 'Error ';
            
            setFormError({...formError , payment: errorMessage});
            setLoading(false);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
        {formError.payment && <p className="text-red mt-6">{formError.payment}</p>}
        <button 
            type="submit" 
            className={`bg-primary py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] disabled:cursor-not-allowed disabled:bg-gray-400 font-bold uppercase w-full mt-8 cursor-pointer hover:bg-gray-darker transition-colors duration-500 ease-in-out ${className ?? ""}`}
            onClick={checkoutHandler}
            disabled={loading}
            >
            Pay with Direct Bank
        </button>
        </>
    )
}
