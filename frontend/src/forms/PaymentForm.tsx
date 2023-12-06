'use client';

import CheckoutButton from "@/components/CheckoutButton";
import FaIcons from "@/components/FaIcons";
import RadioButton from "@/components/forms/RadioButton";
import StripeProvider from "@/providers/StripeProvider";
import { IError, IOrder } from "@/section/CheckoutSection";
import { PaymentElement} from "@stripe/react-stripe-js";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

export default function PaymentForm({order, setOrder, formError, setFormError, loading, setLoading}: {
    order: IOrder; 
    setOrder: Dispatch<SetStateAction<IOrder>>;
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}) {
    
    const [selectedPayment, setSelectedPayment] = useState('bank_transfer');

    function handlePayment (e: ChangeEvent<HTMLInputElement>) {
        setSelectedPayment(e.target.value);
        setOrder({...order, paymentMethod: e.target.value})
    }

  return (
    
        <div className="">
            <div className="mb-4">
                <h3 className="font-bold text-gray-darker text-2xl mb-2">Payment Method</h3>
                <p className="text-sm">
                    <FaIcons icon="faCreditCard" className="pr-2" />
                    We do not save any credit card information.
                </p>
            </div>
                <ul className="p-4 bg-[#ebe9eb] rounded-[5px]">
                    <li>
                        <div className="mb-4">
                            <RadioButton 
                                className="mr-2"
                                name="payment_method" 
                                value="bank_transfer"
                                checked={selectedPayment == 'bank_transfer'} 
                                onChange={handlePayment}
                                showLabel={false}
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
                                className="mr-2"
                                name="payment_method" 
                                value="after_pay"
                                checked={selectedPayment == 'after_pay'}
                                onChange={handlePayment}
                                showLabel={false}
                            />
                            <label htmlFor="payment_method_afterpay">After pay</label>
                        </div>
                        {
                            selectedPayment == 'after_pay' && (
                                <div className="bg-[#dfdcde] mb-4 text-sm p-3 text-gray-darker relative before:content-[''] before:absolute before:-top-2.5 before:left-4 before:w-5 before:h-5 before:rotate-45 before:bg-[#dfdcde] ">
                                    <p>Pay with Afterpay.</p>
                                </div>
                            )
                        }
                    </li>
                    <li>
                        <div className="mb-4">
                            <RadioButton  
                                className="mr-2"
                                name="payment_method" 
                                value="zip_pay"
                                checked={selectedPayment == 'zip_pay'}
                                onChange={handlePayment}
                                showLabel={false}
                            />
                            <label htmlFor="payment_method_zippay">Zip pay</label>
                        </div>
                        {
                            selectedPayment == 'zip_pay' && (
                                <div className="bg-[#dfdcde] mb-4 text-sm p-3 text-gray-darker relative before:content-[''] before:absolute before:-top-2.5 before:left-4 before:w-5 before:h-5 before:rotate-45 before:bg-[#dfdcde] ">
                                    <p>Pay with Zippay.</p>
                                </div>
                            )
                        }
                    </li>
                    <li>
                        <div className="mb-4">
                            <RadioButton 
                                className="mr-2"
                                name="payment_method" 
                                value="stripe"
                                checked={selectedPayment == 'stripe'}
                                onChange={handlePayment}
                                showLabel={false}
                            />
                            <label htmlFor="payment_method_stripe">Credit Card (Stripe)</label>
                        </div>

                        {
                            selectedPayment == 'stripe' && (
                                <StripeProvider>
                                    <StripePayment />
                                    <CheckoutButton order={order} formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />
                                </StripeProvider>
                            )
                        }
                    </li>
                </ul>
            </div>
    
  )
}

function StripePayment () {
    
    return (
        <div className="bg-[#dfdcde] mb-4 text-sm p-3 text-gray-darker relative before:content-[''] before:absolute before:-top-2.5 before:left-4 before:w-5 before:h-5 before:rotate-45 before:bg-[#dfdcde] ">
            <StripeCheckout />
        </div>
    )
}

function StripeCheckout () {

    return (
        <>
            <PaymentElement />
        </>
    )
}