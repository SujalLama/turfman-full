"use client";

import { API_URL } from "@/api/constants";
import NavLink from "@/components/NavLink";
import axios from "axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function PaymentConfirmation() {
    const searchParams = useSearchParams();
    const [paymentSuccess, setPaymentSuccess] = useState(false);
    const [billInfo, setBillInfo] = useState<{id: number;} | null>(null);

    const token = searchParams.get('token')
    const orderId = searchParams.get('orderId');

    useEffect(() => {

        if(orderId && token) {
            getOrderDetails()
        }

    }, [orderId, token])

    function getOrderDetails() {

    }


    
  return (
    <div className="py-32 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px] text-center">
        <div className="text-center">
            <div className="text-3xl font-semibold max-w-[600px] mx-auto mb-8">
                {paymentSuccess
                    ? <p className="text-primary">Thank you for shoping with us. <br /> Your order of id: ({billInfo?.id}) is placed successfully.</p>
                    : <p className="text-red">Please go through our payment process to make a purchase.</p>
                }
            </div>

                
            <Link href="/shop" className="underline hover:text-primary">Return to shop</Link>
                
        </div>
        
    </div>
  )
}

export default PaymentConfirmation;