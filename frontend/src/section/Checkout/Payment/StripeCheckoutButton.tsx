"use client";

import { ORDER_KEY, SITE_URL } from "@/api/constants";
import { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { errorHandler, makeOrder, updateOrder, updateOrderPayment } from "./PaymentForm";
import { ICheckoutButton, initialError } from "../checkout.d";
import { addToStore, removeFromStore } from "@/utils/localStorage";
import { localStoreCartKey } from "@/providers/CartProvider";
import { localStoreShippingKey } from "@/providers/ShippingProvider";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext } from "react";
import { OrderContext } from "@/providers/OrderProvider";


export default function StripeCheckoutButton({className, formError, setFormError, loading, setLoading}: ICheckoutButton) {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();
    const {state:order} = useContext(OrderContext);

    

    async function checkoutHandler () {
        try {
            setFormError(initialError);

            if(errorHandler(order, formError, setFormError)) {
                return;
            }
            
            if(!stripe || !elements) {
                return;
            }

                setLoading(true);

                // order
                let data = null;

                if(orderId) {
                    const orderData = await updateOrderPayment({orderId, email: order?.email ?? '', paymentMethod: 'stripe'});
                    data = {
                        id: orderData.id,
                        email: orderData.email,
                        orderId: orderData.orderId
                    }
                } else {
                    const orderData = await makeOrder(order);
                    data = {
                        id: orderData.id,
                        email: orderData.attributes.email,
                        orderId: orderData.attributes.orderId
                    }
                }

                if(!data) {
                    setFormError({...formError, payment: 'Order is not made'})
                    return;
                }

                removeFromStore(ORDER_KEY);
                addToStore(ORDER_KEY, JSON.stringify({id: data.id, email: data.email, orderId: data.orderId}));

            
                // payment
                const {error, paymentIntent} = await stripe.confirmPayment({elements, confirmParams: {
                    return_url: `${SITE_URL}/checkout/success`,
                    receipt_email: order.email,
                    shipping: {
                        name: `${order.firstName} ${order.lastName}`,
                        phone: `${order.phone}`,
                        address: {
                            line1: order?.street ?? '',
                            city: order?.city ?? '',
                            postal_code: order?.postcode ?? '',
                            state: order?.state ?? '',
                            country: 'australia',
                        }
                    },
                    },
                    redirect: 'if_required',
                })


                if(error) {
                    setFormError({...formError, payment: error?.message ?? ''});
                    setLoading(false);
                    return;
                } 

                if(paymentIntent?.status === "succeeded") {
                    const orderData = await updateOrder({
                        orderId : data.id, email : order?.email ?? '', token : paymentIntent.id, paymentStatus: "paid",
                    });

                    if(orderData) {
                        removeFromStore(localStoreCartKey);
                        removeFromStore(localStoreShippingKey);
                        router.replace(`/checkout/success?order=${data.orderId}`)
                    }
                } else {

                    const orderData = await updateOrder(
                        {
                            orderId : data.id, email : order?.email ?? '', paymentCancel: true
                        }
                        );

                    if(orderData) {
                        router.replace(`/checkout/cancel`)
                    }
                }
    
            
        } catch(error) {
            const {response } = error as AxiosError;
            const data = response?.data as any;

            const errorMessage = data?.error?.message as string ?? 'Error ';
            
            setFormError({...formError , payment: errorMessage});
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
            Pay with Stripe
        </button>
        </>
    )
}
