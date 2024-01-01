"use client";

import { API_URL, ORDER_KEY } from "@/api/constants";

import Logoloader from "@/components/LogoLoader";
import { localStoreCartKey } from "@/providers/CartProvider";
import { updateOrder } from "@/section/Checkout/Payment/PaymentForm";
import { getFromStore, removeFromStore } from "@/utils/localStorage";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Link } from "nextjs13-progress";
import { useEffect, useState } from "react";


export default function OrderConfirm() {
    const searchParams = useSearchParams();
    
    const router = useRouter();
    const checkoutId = searchParams.get("checkoutId");
    const status = searchParams.get("result");
    

    if(!status || !checkoutId) {
        router.replace("/shop");
    }


   return <OrderConfirmContent status={status} checkoutId={checkoutId} />
}

function OrderConfirmContent({status, checkoutId}:{status: string | null; checkoutId: string | null}) {
  

  if(status === "approved") {
    return <ZipCharge checkoutId={checkoutId} key="zip charge" />
  }

  if(status === "success") {
    return <AfterCharge checkoutId={checkoutId} key="after charge" />
  }

  return <OrderCancelled checkoutId={checkoutId} key="cancel charge" />
  
}

function ZipCharge ({checkoutId}: {checkoutId: string | null}) {
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    createZipCharge()
    async function createZipCharge() {
      try {
        
        const url = API_URL + "/payment";
        
  
        const {data} = await axios.post(url, {data: {paymentMethod: "zipPay", token: checkoutId}});
  
        if(!data) {
            setLoading(false);
            setOrderId(getFromStore(ORDER_KEY).orderId);
            removeFromStore(ORDER_KEY);
            return;
        }
  
        removeFromStore(localStoreCartKey);
        removeFromStore(ORDER_KEY);
        router.push(`/checkout/success?order=${data?.orderId}`);
        
  
      } catch (error) {
          
          setOrderId(getFromStore(ORDER_KEY).orderId);
          removeFromStore(ORDER_KEY);
          return;
      }
    }
  }, [checkoutId, router])

  if(loading) {

    return (
      <>
          <Logoloader />
      </>
    )
  }

  return (
    <div className="py-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px] text-center">
      <div className="text-center">
          <div className=" max-w-[600px] mx-auto mb-4">
              <h3 className="text-3xl text-red font-bold mb-2">Your payment is not successful!</h3>
              <p>Please choose another method for payment.</p>
          </div>                
          
          <Link href={`/checkout?orderId=${orderId}`} className="underline hover:text-primary">Go to checkout</Link>
      </div>
      
  </div>
  )

}

function AfterCharge ({checkoutId}: {checkoutId: string | null}) {
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    createAfterCharge()
    async function createAfterCharge () {
      try {
        
          const url = API_URL + "/payment";
          
  
          const {data } = await axios.post(url, {data: {paymentMethod: "afterPay", token: checkoutId}});
  
          
          if(!data) {
            setLoading(false);
            setOrderId(getFromStore(ORDER_KEY).orderId);
            removeFromStore(ORDER_KEY);
            return;
          }
  
          removeFromStore(localStoreCartKey);
          removeFromStore(ORDER_KEY);
          router.push(`/checkout/success?order=${data?.orderId}`);
          
  
        } catch (error) {
          
          setOrderId(getFromStore(ORDER_KEY).orderId);
          removeFromStore(ORDER_KEY);
          return;
        }
  }
  }, [checkoutId, router])

  if(loading) {

    return (
      <>
          <Logoloader />
      </>
    )
  }

  return (
    <div className="py-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px] text-center">
      <div className="text-center">
          <div className=" max-w-[600px] mx-auto mb-4">
              <h3 className="text-3xl text-red font-bold mb-2">Your payment is not successful!</h3>
              <p>Please choose another method for payment.</p>
          </div>                
          
          <Link href={`/checkout?orderId=${orderId}`} className="underline hover:text-primary">Go to checkout</Link>
      </div>
      
  </div>
  )

}

function OrderCancelled ({checkoutId}: {checkoutId: string | null}) {
  const [orderId, setOrderId] = useState();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    
    cancelOrder();

    async function cancelOrder () {
        
        const order = getFromStore(ORDER_KEY);
      

        if(!order) {
          removeFromStore(ORDER_KEY);
          router.replace("/shop")
          return;
        }

        const orderData = await updateOrder({
          orderId : order.id, email : order.email, paymentCancel: true,
        })

        if(!orderData) {
          removeFromStore(ORDER_KEY);
          router.replace("/shop")
          return;
        }

        setLoading(false);
        setOrderId(order.orderId);
        removeFromStore(ORDER_KEY);

    }
  }, [checkoutId, router])

  if(loading) {
    return (
      <>
          <Logoloader />
      </>
    )
  }

  return (
    <div className="py-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px] text-center">
      <div className="text-center">
          <div className=" max-w-[600px] mx-auto mb-4">
              <h3 className="text-3xl text-red font-bold mb-2">Your payment is not successful!</h3>
              <p>Please choose another method for payment.</p>
          </div>                
          
          <Link href={`/checkout?orderId=${orderId}`} className="underline hover:text-primary">Go to checkout</Link>
      </div>
      
  </div>
  )

}

