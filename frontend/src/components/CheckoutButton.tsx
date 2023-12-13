"use client";

import { API_URL, SITE_URL } from "@/api/constants";
import { localStoreCartKey } from "@/providers/CartProvider";
import { localStoreShippingKey } from "@/providers/ShippingProvider";
import { IDelivery, IError, IOrder, initialError } from "@/section/CheckoutSection";
import { removeFromStore } from "@/utils/localStorage";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useState } from "react";

interface ICheckoutButton {
    className?: string; 
    order: IOrder;
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}
export default function CheckoutButton({className, order, formError, setFormError, loading, setLoading}: ICheckoutButton) {
    
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    console.log(order);

    async function checkoutHandler () {
        try {
            setFormError(initialError);

            if(!order.email) {
                setFormError({...formError, email: 'Email is required'})
                return;
            }

            if(!order.pickupEnabled) {
                if(!order.deliveryAddress.city) {
                    setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, city: 'City is required'}})
                    return;
                }
                
                if(!order.deliveryAddress.state) {
                    setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, state: 'state is required'}})
                    return;
                }
        
                if(!order.deliveryAddress.street) {
                    setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, street: 'Street is required'}})
                    return;
                }
        
                if(!order.deliveryAddress.postcode) {
                    setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, postcode: 'postcode is required'}})
                    return;
                }
            }
            
            if(!stripe || !elements) {
                return;
            }

                setLoading(true);

                // order
                const url = API_URL + "/orders"
                const {data:{data}} = await axios.post(url, {data: order});

                if(!data) {
                    setFormError({...formError, payment: 'Order is not made'})
                    return;
                }

            
                // payment
                const {error, paymentIntent} = await stripe.confirmPayment({elements, confirmParams: {
                    return_url: `${SITE_URL}/payment-confirmation`,
                    receipt_email: order.email,
                    shipping: {
                        name: `${order.firstName} ${order.lastName}`,
                        phone: `${order.phone}`,
                        address: {
                            line1: order.deliveryAddress.street,
                            city: order.deliveryAddress.city,
                            postal_code: order.deliveryAddress.postcode,
                            state: order.deliveryAddress.state,
                            country: 'australia',
                        }
                    },
                    },
                    redirect: 'if_required',
                })

                if(error) {
                    await updateOrder(data.id,'cancelled');
                    setFormError({...formError, payment: error?.message ?? ''});
                } 

                if(paymentIntent?.status === "succeeded") {
                    const order = await updateOrder(data.id,'paid', paymentIntent.id);

                    if(order) {
                        removeFromStore(localStoreCartKey);
                        removeFromStore(localStoreShippingKey);
                        router.push(`/payment-confirmation?success=true&orderId=${data.id}`)
                    }
                }
                
            
            setLoading(false);
    
            
        } catch(error) {
            const {response } = error as AxiosError;
            const data = response?.data as any;

            const errorMessage = data?.error?.message as string ?? 'Error ';
            
            setFormError({...formError , payment: errorMessage});
            setLoading(false);
        }
    }

    async function updateOrder (orderId : number, paymentStatus: string, token ?: string,) {
        const url = API_URL + `/orders/${orderId}`;

        const {data:{data}} = await axios.put(url, {data: {token: token ?? '', paymentStatus}});

        return data;

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
            Make Order
        </button>
        </>
    )
}
