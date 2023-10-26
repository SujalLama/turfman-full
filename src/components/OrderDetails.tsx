"use client";

import { CartContext } from "@/app/providers/CartProvider";
import { getCartTotal } from "@/utils/cartTotal";
import { useContext } from "react";

interface IOrder {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export default function OrderDetails() {
    const {state} = useContext(CartContext);

    const subtotal = getCartTotal(state);
    const shipping = 0;
    const tax = 4.67;
    const total = subtotal + shipping + tax;

    if(state.length === 0) {
        return null;
    }

  return (
    <div className="mb-6">
        <h3 className="font-bold text-gray-darker text-[28px] mb-4">Your order</h3>    
        <table className="text-left w-full">
            <thead>
                <tr>
                    <th className="border px-[9px] py-[12px">Product</th>
                    <th className="border px-[9px] py-[12px]">Subtotal</th>
                </tr>
            </thead>

            <tbody>
                {
                    state.map(order => {
                        return (
                            <tr key={order.id}>
                                <td className="border px-[9px] py-[12px]">
                                    <span>{order.name}</span>&nbsp;<strong>×&nbsp;{order.quantity}</strong>
                                </td>
                                <td className="border px-[9px] py-[12px]">
                                    <span>${order.price}</span>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>

            <tfoot>
                <tr>
                    <th className="border px-[9px] py-[12px]">Subtotal</th>
                    <td className="border px-[9px] py-[12px]">
                        <span>${subtotal}</span>
                    </td>
                </tr>
            
                <tr>
                    <th className="border px-[9px] py-[12px]">Shipping</th>
                    <td className="border px-[9px] py-[12px]">
                        Enter your address to view shipping options.
                    </td>
                </tr>
        
                <tr>
                    <th className="border px-[9px] py-[12px]">Total</th>
                    <td className="border px-[9px] py-[12px]">
                        <strong>${total}</strong> 
                        <small>(includes <span>$4.64</span> GST)</small>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}
