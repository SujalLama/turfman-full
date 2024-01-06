"use client";

import { API_URL, ORDER_KEY, SITE_URL } from "@/api/constants";
import axios, { AxiosError } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { errorHandler, makeOrder, updateOrder, updateOrderPayment } from "./PaymentForm";
import { ICheckoutButton, initialError } from "../checkout.d";
import { addToStore, removeFromStore } from "@/utils/localStorage";
import { useContext } from "react";
import { OrderContext } from "@/providers/OrderProvider";



export default function AfterCheckoutButton({className, formError, setFormError, loading, setLoading}: ICheckoutButton) {
    const searchParams = useSearchParams();
    const orderId = searchParams.get("orderId");
    const router = useRouter();
    const {state:order} = useContext(OrderContext);
    

    async function onClick () {
        try {
            setFormError(initialError);
            
            if(errorHandler(order, formError, setFormError)) {
                return;
            }
            
            setLoading(true);

            let orderData = null;

            if(orderId) {
                const data = await updateOrderPayment({orderId, email: order?.email ?? '', paymentMethod: "afterPay"});
                orderData = {
                    id: data.id,
                    email: data.email, 
                    orderId: data.orderId,
                }
            } else {
                const data = await makeOrder(order);
                orderData = {
                    id: data.id,
                    email:data.attributes.email, 
                    orderId: data.attributes.orderId,
                }
            }

            if(!orderData) {
                setLoading(false)
                return;
            }

            
            removeFromStore(ORDER_KEY);
            addToStore(ORDER_KEY, JSON.stringify(orderData));

            const data = await createCheckout();

            if(!data) {
                setLoading(false)
                return;
            }

            afterPayConfirm(orderData, data);
            
        } catch (error) {
            const {response } = error as AxiosError;
            const data = response?.data as any;

            const errorMessage = data?.error?.message as string ?? 'Error ';
            
            setFormError({...formError , payment: errorMessage});
            setLoading(false);
        }
        
    }

    async function createCheckout() {
        try {
            
            const url = API_URL + "/payment-intent";
    
            const {data} = await axios.post(url,{
                 
                data: {
                    paymentMethod: "afterPay",
                    order: {
                        amount: {
                            amount: order?.total?.toFixed(2),
                            currency: "AUD"
                        },
                        consumer: {
                            email: order?.email,
                        },
                        billing: {
                            name: order?.firstName + ' ' + order?.lastName,
                            line1: order?.billStreet,
                            area1: order?.billCity,
                            region: order?.billState,
                            postcode: order?.billPostcode,
                            countryCode: "AU"
                        },
                        merchant: {
                            redirectConfirmUrl: process.env.NEXT_PUBLIC_SITE_URL + "/order-confirmation",
                            redirectCancelUrl: process.env.NEXT_PUBLIC_SITE_URL + "/order-confirmation"
                        },
                        items: order?.products?.map(item => ({
                            name: item.name, 
                            pageUrl: SITE_URL+item?.link, 
                            imageUrl: item.img?.src, 
                            quantity: item.quantity,
                            price: {amount: item.price?.toFixed(2), currency: "AUD"},
                        })),
                        taxAmount: {
                            amount: order?.tax?.toFixed(2),
                            currency: 'AUD'
                        },
                        shippingAmount : {
                            amount: order?.shippingCost?.toFixed(2),
                            currency: 'AUD'
                        },
                        discounts: [{
                            displayName: 'New coupon',
                            amount: {
                                amount: order?.discount?.toFixed(2),
                                currency: 'AUD'
                            }
                        }],
                    }
                }
            })
    
            if(!data) {
                return null;
            }
    
            return data;

        } catch (error) {
            return null;   
        }
    }
        
    
    function afterPayConfirm (order: any, tokenData: any) {
        
        const AfterPay = window.AfterPay;

        if(!AfterPay) {
            return;
        }

        AfterPay.initialize({countryCode: "AU"});
            
        AfterPay.open();
        AfterPay.transfer({token : tokenData.token});

        
        AfterPay.onComplete = async function(event : any) {
            if (event.data.status == "SUCCESS") {
                // The customer confirmed the payment schedule.
                // The token is now ready to be captured from your server backend.
                
                const orderData = await updateOrder({orderId: order.id, email: order.email, token: event.data.orderToken});
            
                if(orderData) {
                    router.replace(`/order-confirmation?result=success&checkoutId=${event.data.orderToken}`)
                }



            } else {
                // The customer cancelled the payment or closed the popup window.
                // await updateOrder(order.id, order.attributes.email, "", true);
                router.replace(`/order-confirmation?result=cancelled&checkoutId=${event.data.orderToken}`);
            }
        }

        
    }

    return (
        <>
        {formError.payment && <p className="text-red mt-6">{formError.payment}</p>}
        
        <button
            disabled={loading}
            type="submit" 
            className={`bg-primary py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] disabled:cursor-not-allowed disabled:bg-gray-400 font-bold uppercase w-full mt-8 cursor-pointer hover:bg-gray-darker transition-colors duration-500 ease-in-out `}
            onClick={onClick}
            >
            Pay with AfterPay
        </button>
        </>
    )
}
