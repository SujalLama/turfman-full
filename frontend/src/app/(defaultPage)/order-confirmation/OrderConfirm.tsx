"use client";

import { API_URL, ORDER_KEY } from "@/api/constants";

import Logoloader from "@/components/LogoLoader";
import { localStoreCartKey } from "@/providers/CartProvider";
import { updateOrder } from "@/section/Checkout/Payment/PaymentForm";
import { getFromStore, removeFromStore } from "@/utils/localStorage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";


export default function OrderConfirm() {
    const searchParams = useSearchParams();
    const router = useRouter()

    const checkoutId = searchParams.get("checkoutId");
    const status = searchParams.get("result");

    if(!status || !checkoutId) {
        router.replace("/shop");
    }

    useEffect(() => {
      
      if(status === "cancelled") {
        cancelOrder();
      }

      if(status === "declined" || status == "deferred") {
        updateOrderForDecline();
      }
  
    }, [status])

    async function updateOrderForDecline() {
        const order = getFromStore(ORDER_KEY);
        removeFromStore(ORDER_KEY);

        if(!order) {
          router.replace("/checkout")
          return;
        }

        await updateOrder({
          orderId : order.id, email : order.email, paymentCancel: true,
        })


        router.replace("/checkout");
    }


    async function cancelOrder () {
        removeFromStore(localStoreCartKey);
        
        const order = getFromStore(ORDER_KEY);
        removeFromStore(ORDER_KEY);

        if(!order) {
          router.replace("/checkout")
          return;
        }

        const orderData = await updateOrder({
          orderId : order.id, email : order.email, paymentCancel: true,
        })

        if(!orderData) {
          router.replace("/checkout")
          return;
        }

        router.replace("/checkout/cancel");
    }


    useEffect(() => {
      if(status === "approved") {
        createZipCharge();
      }

      if(status === "success") {
        createAfterCharge();
      }
    },[status])

    async function createZipCharge() {
      try {
        const url = API_URL + "/payment";
        

        const {data} = await axios.post(url, {data: {paymentMethod: "zipPay", token: checkoutId}});

        if(!data) {
            router.replace("/checkout")
          return;
        }

        removeFromStore(localStoreCartKey);
        router.push(`/checkout/success?order=${data.id}`);
        

      } catch (error) {
        router.replace("/checkout");
        return error;
      }
    }

    async function createAfterCharge () {
        try {
            const url = API_URL + "/payment";
            
    
            const {data} = await axios.post(url, {data: {paymentMethod: "afterPay", token: checkoutId}});
    
            
            if(!data) {
                router.replace("/checkout")
              return;
            }
    
            removeFromStore(localStoreCartKey);
            router.push(`/checkout/success?order=${data.id}`);
            
    
          } catch (error) {
            router.replace("/checkout");
            return error;
          }
    }

  return (
    <>
        <Logoloader />
        <p>Payment Processing ...</p>
    </>
    
  )
}
