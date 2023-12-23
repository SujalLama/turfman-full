"use client";

import { API_URL, ORDER_KEY, SITE_URL } from "@/api/constants";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { errorHandler, makeOrder, updateOrder } from "./PaymentForm";
import { ICheckoutButton, initialError } from "../checkout.d";
import { addToStore, removeFromStore } from "@/utils/localStorage";

export default function ZipCheckoutButton({className, order, formError, setFormError, loading, setLoading}: ICheckoutButton) {
    
    const router = useRouter();

    async function createCheckout(orderData: any) {
        try {
            const url = API_URL + "/payment-intent";
    
            const {data} = await axios.post(url,{
                 
                data: {
                    paymentMethod: "zipPay",
                    order: {
                        shopper: {
                            first_name: order.firstName,
                            last_name: order.lastName,
                            email: order.email,
                            phone: order.phone,
                            billing_address: {
                                first_name: order.firstName,
                                last_name: order.lastName,
                                line1: order.deliveryAddress.street,
                                city: order.deliveryAddress.city,
                                state: order.deliveryAddress.state,
                                postal_code: order.deliveryAddress.postcode,
                                country: "AU"
                            },
                        },
                        order: {
                            reference: orderData.id,
                            amount: order.total,
                            currency: "AUD",
                            items: [...order.products.map((item, index) => ({
                                name: item.name, 
                                item_uri: SITE_URL+item?.link, 
                                image_uri: item.img?.src, 
                                quantity: item.quantity,
                                amount: item.price,
                                type: "sku",
                                reference: `00${index + 1}`
                                
                            })), {
                                name: "Discout",
                                amount: order.discount,
                                quantity: 1,
                                type: "discount"
                            }],
                            shipping: order.pickupEnabled ? {
                                pickup: true
                            } : {
                                pickup: false,
                                address: {
                                    first_name: order.firstName,
                                    last_name: order.lastName,
                                    line1: order.deliveryAddress.street,
                                    city: order.deliveryAddress.city,
                                    state: order.deliveryAddress.state,
                                    postal_code: order.deliveryAddress.postcode,
                                    country: "AU"
                                }
                            }
                        },
                        "config": {
                            "redirect_uri": SITE_URL + "/order-confirmation"
                        },
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

    
    async function onClick () {

        try {

            setFormError(initialError);

            if(errorHandler(order, formError, setFormError)) {
                return;
            }

            setLoading(true);
            
            const orderData = await makeOrder(order);
    
            if(!orderData) {
                setLoading(false);
                setFormError({...formError, payment: "Error creating order."})
                return;
            }

            // add to Store
            removeFromStore(ORDER_KEY);
            addToStore(ORDER_KEY, JSON.stringify({id: orderData.id, email: orderData.attributes.email}));

            const data = await createCheckout(orderData);
            
            if(!data) {
                setLoading(false)
                setFormError({...formError, payment: "Error creating checkout. Choose other payment method."})
                return;
            }
    
            const updatedOrder = await updateOrder({
                orderId : orderData.id, email : orderData.attributes.email, token : data.id, 
            });

            if(!updatedOrder) {
                setLoading(false);
                setFormError({...formError, payment: "Error updating order. Please try again later!"})
                return;
            }

            router.push(data.uri);
            setLoading(false);

        } catch (error) {
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
            className={`bg-primary py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] disabled:cursor-not-allowed disabled:bg-gray-400 font-bold uppercase w-full mt-8 cursor-pointer hover:bg-gray-darker transition-colors duration-500 ease-in-out `}
            onClick={onClick}
            disabled={loading}
            >
            Make Order Zip
        </button>
        </>
    )
}