'use client';

import { API_URL } from "@/api/constants";
import FaIcons from "@/components/FaIcons";
import RadioButton from "@/components/forms/RadioButton";

import StripeProvider from "@/providers/StripeProvider";

import { PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { IError, IOrder, IPayment} from "../checkout.d";
import ZipCheckoutButton from "./ZipCheckoutButton";
import AfterCheckoutButton from "./AfterCheckoutButton";
import StripeCheckoutButton from "./StripeCheckoutButton";
import BankCheckoutButton from "./BankCheckoutButton";

export default function PaymentForm({payment, setPayment, formError, setFormError, loading, setLoading, order}: {
    order: IOrder;
    payment: IPayment; 
    setPayment: Dispatch<SetStateAction<IPayment>>;
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}) {
    
    const [selectedPayment, setSelectedPayment] = useState('bankTransfer');

    function handlePayment (e: ChangeEvent<HTMLInputElement>) {
        setSelectedPayment(e.target.value);
        setPayment({paymentMethod: e.target.value})
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
                                value="bankTransfer"
                                checked={selectedPayment == 'bankTransfer'} 
                                onChange={handlePayment}
                                showLabel={false}
                            />
                            <label>Direct bank transfer</label>
                        </div>
                        {
                            selectedPayment == 'bankTransfer' && (
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
                                value="afterPay"
                                checked={selectedPayment == 'afterPay'}
                                onChange={handlePayment}
                                showLabel={false}
                            />
                            <label htmlFor="payment_method_afterpay">After pay</label>
                        </div>
                        {
                            selectedPayment == 'afterPay' && (
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
                                value="zipPay"
                                checked={selectedPayment == 'zipPay'}
                                onChange={handlePayment}
                                showLabel={false}
                            />
                            <label htmlFor="payment_method_zippay">Zip pay</label>
                        </div>
                        {
                            selectedPayment == 'zipPay' && (
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
                    </li>
                </ul>
                {selectedPayment === 'bankTransfer' && <BankCheckoutButton order={order} formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />}
                {selectedPayment === 'afterPay' && <AfterCheckoutButton order={order} formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />}
                {selectedPayment === 'zipPay' && <ZipCheckoutButton order={order} formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />}
                {
                    selectedPayment == 'stripe' && (
                        <StripeProvider total={order.total}>
                            <div className="bg-[#dfdcde] mb-4 text-sm p-3 text-gray-darker relative before:content-[''] before:absolute before:-top-2.5 before:left-4 before:w-5 before:h-5 before:rotate-45 before:bg-[#dfdcde] ">
                                <PaymentElement />
                            </div>
                            <StripeCheckoutButton order={order} formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />
                        </StripeProvider>
                    )
                }
    </div>
    
  )
}


export async function updateOrder ({
    orderId, email, token, paymentCancel } : 
    {orderId: string; email: string; token?: string; paymentCancel?: boolean}
) {
    const url = API_URL + `/orders/${orderId}`;

    const data = await axios.put(url, {data: {token: token ?? '', email, paymentCancel}});

    return data;

}

export async function makeOrder (order : IOrder) {
    try {
        const url = API_URL + "/orders"
        const orderData = order.pickupEnabled ? {
            firstName: order.firstName,
            lastName: order.lastName,
            email: order.email,
            phone: order.phone,
            paymentMethod: order.paymentMethod,
            pickupDate: order.pickupDate,
            total: order.total,
            subTotal: order.subTotal,
            tax: order.tax,
            shippingCost: order.shippingCost,
            discount: order.discount,
            deliveryStatus: 'noRequired',
            products: order.products,
        } : order;
    
        const {data:{data}} = await axios.post(url, {data: orderData});

        if(!data) {
            return null;
        }

        return data;
        
    } catch (error) {
        return null;
    }
}

export function errorHandler (
    order: IOrder,
    formError: IError,
    setFormError: Dispatch<SetStateAction<IError>>) 
    {

    if(!order.email) {
        setFormError({...formError, email: 'Email is required'})
        return true;
    }

    if(!order.pickupEnabled) {
        if(!order.deliveryAddress.city) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, city: 'City is required'}})
            return true;
        }
        
        if(!order.deliveryAddress.state) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, state: 'state is required'}})
            return true;
        }

        if(!order.deliveryAddress.street) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, street: 'Street is required'}})
            return true;
        }

        if(!order.deliveryAddress.postcode) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, postcode: 'postcode is required'}})
            return true;
        }

        if(!order.deliveryDate) {
            setFormError({...formError, deliveryDate: 'Please Provide Delivery date'})
            return true;
        }

    }  else {

        if(!order.pickupDate) {
            setFormError({...formError, pickupDate: 'Please Provide Pickup date' })
            return;
        }
    }

    return false;
}