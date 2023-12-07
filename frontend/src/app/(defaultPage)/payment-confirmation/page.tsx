"use client";

import { API_URL } from "@/api/constants";
import QueryProvider from "@/providers/QueryProvider";
import { formatDate } from "@/utils/dataFormatter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function PaymentConfirmation() {
    
  return (
    <QueryProvider>
        <PaymentConfirmBlock />
    </QueryProvider>
  )
}

function PaymentConfirmBlock () {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('orderId');
    const {data, isPending} = useQuery({queryKey: ['billInfo', orderId], queryFn: () => getOrderDetails(orderId)})

    async function getOrderDetails(id: string | null) {

        if(!orderId) {
            return null;
        }
        
        const url = API_URL + `/orders/${id}`
        const {data:{data}} = await axios.get(url);

        if(!data) {            
            return null;
        }

        return data;
    }

    

    if(isPending) return <div>Loading...</div>


    return (
        <div className="py-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px] text-center">
        <div className="text-center">
            <div className=" max-w-[600px] mx-auto mb-8">
            
                {data
                    ? (
                        <div>
                            <h3 className="text-primary text-3xl mb-2 font-bold ">Thank you for shoping with us.</h3>
                            <p className="mb-8">Your order is placed successfully. Details of the order:</p>
                            
                            <button className="bg-primary py-2 px-4 text-white rounded-[4px] mb-6">
                                Download Reciept
                            </button>

                            <div className="overflow-auto">
                                <BillInfo order={data} />
                            </div>
                        </div>
                    )
                    : <p className="text-3xl text-red font-semibold">Please go through our payment process to make a purchase.</p>
                }

                <div className="flex  justify-between mt-8">
                    
                    
                </div>
            </div>

            
                
                
        </div>
        
    </div>
    )
}

function BillInfo ({order} : {order: any}) {
    return (
        <table className="w-[600px] ">

            <tbody>
                <tr>
                    <th className="border px-6 py-4 font-semibold">Order Id</th>
                    <td className="border px-6 py-4 text-right text-black">
                        {order.id}
                    </td>
                </tr>
                <tr>
                    <th className="border px-6 py-4 font-semibold">Payment details</th>
                    <td className="border px-6 py-4">

                        <div className=" flex items-center pb-2 border-b">
                            <div className=" flex-1 text-left md:text-left mr-8">
                                <span className="text-sm ">Payment status:</span>					
                            </div>

                            <div className=" text-right text-black">
                                <span className="capitalize">{order.attributes.paymentStatus}</span>						
                            </div>
                        </div>

                        <div className=" flex items-center pt-2 ">
                            <div className="  flex-1 text-left md:text-left mr-8">
                                <span className="text-sm">Payment method:</span>					
                            </div>

                            <div className=" capitalize text-black ">
                                <span>{order.attributes.paymentMethod}</span>						
                            </div>
                        </div>
                    
                    </td>
                </tr>
                <tr>
                    <th className="border px-6 py-4 font-semibold">Delivery details</th>
                    <td className="border px-6 py-4">

                        <div className=" flex items-center pb-2 border-b">
                            <div className=" flex-1 text-left md:text-left mr-8">
                                <span className="text-sm ">Address:</span>					
                            </div>

                            <div className=" text-right text-black">
                                
                                    {
                                        order.attributes.deliveryAddress.city + " , " + order.attributes.deliveryAddress.state +
                                        " , " + order.attributes.deliveryAddress.postcode + " , " + order.attributes.deliveryAddress.street
                                    }
                                					
                            </div>
                        </div>

                        <div className=" flex items-center pt-2 ">
                            <div className="  flex-1 text-left md:text-left mr-8">
                                <span className="text-sm ">Delivery date:</span>					
                            </div>

                            <div className="text-right capitalize  text-black">
                                <span>{formatDate(order.attributes.deliveryDate)}</span>						
                            </div>
                        </div>
                    
                    </td>
                </tr>

                <tr>
                    <th className="border px-6 py-4 font-semibold">Customer details</th>
                    <td className="border px-6 py-4">

                        <div className=" flex items-center pb-2 border-b">
                            <div className=" flex-1 text-left md:text-left mr-8">
                                <span className="text-sm ">Email:</span>					
                            </div>

                            <div className=" text-right  text-black">
                                
                                    {order.attributes.email}
                                				
                            </div>
                        </div>

                        <div className=" flex items-center pt-2 ">
                            <div className="  flex-1 text-left md:text-left mr-8">
                                <span className="text-sm  ">Phone:</span>					
                            </div>

                            <div className="text-right capitalize   text-black">
                                <span>{order.attributes.phone}</span>						
                            </div>
                        </div>
                    
                    </td>
                </tr>

                {order.attributes.pickupDate && (
                    <tr>
                        <th className="border px-6 py-4 font-semibold">PickUp date</th>
                        <td className="border px-6 py-4 text-right text-black">
                            {formatDate(order.attributes.pickupDate)}
                        </td>
                    </tr>
                )}
                
                <tr>
                    <th className="border px-6 py-4 font-semibold">Products</th>
                    <td className="border px-6 py-4">
                        {
                            order.attributes.products.map((cartItem : any) => {
                                const {id, img, name, quantity, price} = cartItem
                                
                                return (
                                    <div key={id} className="mb-2 last:mb-0 flex items-center border-b last:border-b-0">
                                        <div className="w-10 h-10 block border-2 relative">
                                            <Image 
                                                width="200" 
                                                height="200" 
                                                src={img?.src ?? ''} 
                                                className="w-full h-full object-cover object-center" 
                                                alt={img?.alt ?? ''} 
                                                loading="lazy" />

                                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full text-white text-center">
                                                <span className="text-sm leading-6">{quantity ?? 0}</span>
                                            </div>
                                        </div>						
                                        
                            
                                        <div className=" p-4 flex-1 text-center md:text-left">
                                            <span className="text-sm  text-black">{name}</span>					
                                        </div>

                                        <div className="text-right text-black  py-4">
                                            <span>${((quantity ?? 0) * (price ?? 0)).toFixed(2)}</span>						
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </td>
                </tr>
                <tr className="">
                    <th className="border px-6 py-4 font-semibold">Subtotal</th>
                    <td className="border px-6 py-4 text-right text-black">
                            ${order.attributes.subTotal}
                    </td>
                </tr>


                    <tr className="">
                        <th className="border px-6 py-4 font-semibold">Shipping Cost</th>
                        <td className="border px-6 py-4 text-right text-black">
                            ${order.attributes.shippingCost}
                        </td>
                    </tr>

                    <tr className="">
                        <th className="border px-6 py-4 font-semibold">Total</th>
                        <td className="border px-6 py-4 text-right text-black">
                            <strong>
                                ${order.attributes.total}
                            </strong> 
                            <small> (
                                includes
                                ${order.attributes.tax} GST)
                            </small>
                        </td>
                    </tr>

            </tbody>
        </table>
    )
}

export default PaymentConfirmation;