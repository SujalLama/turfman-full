"use client";

import { API_URL } from "@/api/constants";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { errorHandler } from "./PaymentForm";
import { ICheckoutButton, initialError } from "../checkout.d";
import { removeFromStore } from "@/utils/localStorage";
import { localStoreCartKey } from "@/providers/CartProvider";
import { localStoreShippingKey } from "@/providers/ShippingProvider";


export default function BankCheckoutButton({className, order, formError, setFormError, loading, setLoading}: ICheckoutButton) {
    
    const router = useRouter();

    async function checkoutHandler () {
        try {
            setFormError(initialError);

            if(errorHandler(order, formError, setFormError)) {
                return;
            }


                setLoading(true);

                // order
                const url = API_URL + "/orders"

                const orderData = order.pickupEnabled ? {
                    firstName: order.firstName,
                    lastName: order.lastName,
                    email: order.email,
                    phone: order.phone,
                    paymentMethod: "bankTransfer",
                    pickupDate: order.pickupDate,
                    total: order.total,
                    subTotal: order.subTotal,
                    tax: order.tax,
                    shippingCost: order.shippingCost,
                    discount: order.discount,
                    deliveryStatus: 'noRequired',
                    products: order.products,
                } : {...order, paymentMethod: "bankTransfer"};

                const {data:{data}} = await axios.post(url, {data: orderData});


                if(!data) {
                    setFormError({...formError, payment: 'Order is not made'})
                    return;
                }


                removeFromStore(localStoreCartKey);
                removeFromStore(localStoreShippingKey);

                router.push(`/checkout/success?order=${data.id}`)
            
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
