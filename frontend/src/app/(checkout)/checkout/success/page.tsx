"use client";

import { API_URL } from "@/api/constants";
import QueryProvider from "@/providers/QueryProvider";
import { formatDate } from "@/utils/dataFormatter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useRef, useState } from "react";
import html2canvas from 'html2canvas';
import FaIcons from "@/components/FaIcons";
import Logoloader from "@/components/LogoLoader";
import { Link } from "nextjs13-progress";


function CheckoutSuccess() {
    
  return (
    <QueryProvider>
        <PaymentConfirmBlock />
    </QueryProvider>
  )
}

function PaymentConfirmBlock () {
    const searchParams = useSearchParams();
    const orderId = searchParams.get('order');
    const [loading, setLoading] = useState(false);

    const {data, isPending} = useQuery({queryKey: ['billInfo', orderId], queryFn: () => getOrderDetails(orderId)})
    const billRef = useRef(null);

    async function getOrderDetails(id: string | null) {

        if(!orderId) {
            return null;
        }
        
        const url = API_URL + `/orders/${orderId}`
        const {data:{data}} = await axios.get(url);

        if(!data) {            
            return null;
        }

        return data;
    }

    function handleDownload() {
        setLoading(true);
        // Get the current HTML content
        if(!billRef.current) {
            return;
        }

       // Capture the current HTML content as an image using html2canvas
        html2canvas(billRef.current).then(canvas => {
            // Convert the canvas to a data URL
            const dataUrl = canvas.toDataURL('image/png');
    
            // Create a link element
            const link = document.createElement('a');
    
            // Set the download attribute and the URL of the data URL
            link.href = dataUrl;
            link.download = `ttp-order-${orderId}.png`;
    
            // Append the link to the document
            document.body.appendChild(link);
    
            // Trigger a click on the link to start the download
            link.click();
    
            // Remove the link from the document
            document.body.removeChild(link);

            setLoading(false);
        });
    }

    if(isPending) return <Logoloader />


    return (
        <div className="py-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px] text-center">
        <div className="text-center">
            <div className=" max-w-[600px] mx-auto mb-8">
            
                {data
                    ? (
                        <div >
                            <h3 className="text-primary text-3xl mb-2 font-bold ">Thank you for shoping with us.</h3>
                            <p className="mb-8">Your order is placed successfully. Details of the order:</p>
                            
                            <button className="bg-primary py-2 px-4 text-white rounded-[4px] mb-6 text-sm tracking-[1px] font-bold uppercase cursor-pointer transition-colors duration-500 ease-in-out disabled:cursor-not-allowed disabled:bg-gray-400" onClick={handleDownload} disabled={loading}>
                                <FaIcons icon="faFile" className="mr-2"/>
                                <span>
                                    Download Reciept
                                </span>
                            </button>

                            <div className="overflow-auto" >
                                <BillInfo order={data} billRef={billRef} />
                            </div>
                        </div>
                    )
                    : <p className="text-3xl text-red font-semibold">Please go through our payment process to make a purchase.</p>
                }

                <div className="mt-8">
                    <Link href="/shop" className="underline hover:text-primary">Continue Shopping</Link>
                </div>
            </div>

            
                
                
        </div>
        
    </div>
    )
}

export function BillInfo ({order, billRef} : {order: any, billRef?: any}) {
    return (
        <table className="w-[600px]" ref={billRef}>

            <tbody className="m-4">
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
                {order.attributes.deliveryStatus === "noRequired"
                ? (
                    <tr>
                        <th className="border px-6 py-4 font-semibold">Pickup details</th>
                        <td className="border px-6 py-4">

                            <div className=" flex items-center pt-2 ">
                                <div className="  flex-1 text-left md:text-left mr-8">
                                    <span className="text-sm ">Pickup date:</span>					
                                </div>

                                <div className="text-right capitalize  text-black">
                                    <span>{formatDate(order.attributes.pickupDate)}</span>						
                                </div>
                            </div>
                        
                        </td>
                    </tr>
                )
                : (
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
                ) 
                }

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
                                        <div className="w-10 h-10 block border-2">
                                            <Image 
                                                width="200" 
                                                height="200" 
                                                src={img?.src ?? ''} 
                                                className="w-full h-full object-cover object-center" 
                                                alt={img?.alt ?? ''} 
                                                loading="lazy" />

                                            {/* <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full text-white text-center">
                                                <
                                            </div> */}
                                        </div>						
                                        
                            
                                        <div className=" p-4 flex-1 text-center md:text-left text-black">
                                            <span className="text-sm  ">{name}</span>
                                            <span className="font-semibold text-sm pl-2 pr-1">x</span>
                                            <span className="text-sm font-semibold leading-6">{quantity ?? 0}</span>				
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
                        <th className="border px-6 py-4 font-semibold">Discount</th>
                        <td className="border px-6 py-4 text-right text-black">
                            -${order.attributes.discount ?? 0}
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

export default CheckoutSuccess;
