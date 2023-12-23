"use client";

import { ORDER_KEY, SITE_URL } from "@/api/constants";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { errorHandler, makeOrder, updateOrder } from "./PaymentForm";
import { ICheckoutButton, initialError } from "../checkout.d";
import { addToStore, removeFromStore } from "@/utils/localStorage";
import { localStoreCartKey } from "@/providers/CartProvider";
import { localStoreShippingKey } from "@/providers/ShippingProvider";
import { useElements, useStripe } from "@stripe/react-stripe-js";


export default function StripeCheckoutButton({className, order, formError, setFormError, loading, setLoading}: ICheckoutButton) {
   
    const stripe = useStripe();
    const elements = useElements();
    const router = useRouter();

    

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
                const data = await makeOrder(order);

                if(!data) {
                    setFormError({...formError, payment: 'Order is not made'})
                    return;
                }

                removeFromStore(ORDER_KEY);
                addToStore(ORDER_KEY, JSON.stringify({id: data.id, email: data.attributes.email}));

            
                // payment
                const {error, paymentIntent} = await stripe.confirmPayment({elements, confirmParams: {
                    return_url: `${SITE_URL}/checkout/success`,
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
                    setFormError({...formError, payment: error?.message ?? ''});
                    setLoading(false);
                    return;
                } 

                if(paymentIntent?.status === "succeeded") {
                    const orderData = await updateOrder({
                        orderId : data.id, email : order.email, token : paymentIntent.id 
                    });

                    if(orderData) {
                        removeFromStore(localStoreCartKey);
                        removeFromStore(localStoreShippingKey);
                        router.replace(`/checkout/success?order=${data.id}`)
                    }
                } else {

                    const orderData = await updateOrder(
                        {
                            orderId : data.id, email : order.email, paymentCancel: true
                        }
                        );

                    if(orderData) {
                        router.replace(`/checkout/cancel`)
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
