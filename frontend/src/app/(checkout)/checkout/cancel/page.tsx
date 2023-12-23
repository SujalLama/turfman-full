"use client"

import { Link } from "nextjs13-progress"

export default function CheckoutCancel() {
  return (
    <div className="py-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px] text-center">
        <div className="text-center">
            <div className=" max-w-[600px] mx-auto mb-4">
                <h3 className="text-3xl text-red font-bold mb-2">Your order has been cancelled.</h3>
                <p >Please go through our payment process to make a purchase.</p>
            </div>                
            
            <Link href="/shop" className="underline hover:text-primary">Continue Shopping</Link>
        </div>
        
    </div>
  )
}
