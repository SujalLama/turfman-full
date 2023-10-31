'use client';

import RadioButton from "@/components/forms/RadioButton";
import { ChangeEvent, useState } from "react";

export default function PaymentForm() {
    const [selectedPayment, setSelectedPayment] = useState('bank_transfer');

    function handlePayment (e: ChangeEvent<HTMLInputElement>) {
        setSelectedPayment(e.target.value);
    }

  return (
    <div className="bg-[#ebe9eb] rounded-[5px]">
            <ul className="p-4">
                <li>
                    <div className="mb-4">
                        <RadioButton 
                            className="mr-1"
                            name="payment_method" 
                            value="bank_transfer"
                            checked={selectedPayment == 'bank_transfer'} 
                            onChange={handlePayment}
                        />
                        <label>Direct bank transfer</label>
                    </div>
                    {
                        selectedPayment == 'bank_transfer' && (
                            <div className="bg-[#dfdcde] mb-4 text-sm p-3 text-gray-darker relative before:content-[''] before:absolute before:-top-2.5 before:left-4 before:w-5 before:h-5 before:rotate-45 before:bg-[#dfdcde]">
                                <p>Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order will not be shipped until the funds have cleared in our account.</p>
                            </div>
                        )
                    }
                    
                </li>
                <li>
                    <div className="mb-4">
                        <RadioButton  
                            className="mr-1"
                            name="payment_method" 
                            value="cod"
                            checked={selectedPayment == 'cod'}
                            onChange={handlePayment}
                        />
                        <label htmlFor="payment_method_cod">Cash on delivery</label>
                    </div>
                    {
                        selectedPayment == 'cod' && (
                            <div className="bg-[#dfdcde] mb-4 text-sm p-3 text-gray-darker relative before:content-[''] before:absolute before:-top-2.5 before:left-4 before:w-5 before:h-5 before:rotate-45 before:bg-[#dfdcde] ">
                                <p>Pay with cash upon delivery.</p>
                            </div>
                        )
                    }
                </li>
                <li>
                    <div className="mb-4">
                        <RadioButton 
                            className="mr-1"
                            name="payment_method" 
                            value="stripe"
                            checked={selectedPayment == 'stripe'}
                            onChange={handlePayment}
                        />
                        <label htmlFor="payment_method_stripe">Credit Card (Stripe)</label>
                    </div>

                    {
                        selectedPayment == 'stripe' && (
                        <div className="bg-[#dfdcde] mb-4 text-sm p-3 text-gray-darker relative before:content-[''] before:absolute before:-top-2.5 before:left-4 before:w-5 before:h-5 before:rotate-45 before:bg-[#dfdcde] ">
                            <div>
                                <p>Pay with your credit card via Stripe.</p>
                                <fieldset>
                                    <label htmlFor="card-element">Credit or debit card</label>
                                </fieldset>
                            </div>		
                        </div>
                        )
                    }
                </li>
            </ul>
            
            <div className="border-t border-t-[#d3ced2] p-4 md:text-right">
                <button type="submit" className="bg-primary py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase w-full md:w-auto cursor-pointer hover:bg-gray-darker transition-colors duration-500 ease-in-out" name="woocommerce_checkout_place_order" id="place_order" value="Place order">
                    Place order
                </button>
            </div>
        </div>
  )
}
