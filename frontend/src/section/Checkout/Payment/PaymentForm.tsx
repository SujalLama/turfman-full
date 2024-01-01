'use client';

import { API_URL } from "@/api/constants";
import FaIcons from "@/components/FaIcons";
import RadioButton from "@/components/forms/RadioButton";

import StripeProvider from "@/providers/StripeProvider";

import { PaymentElement } from "@stripe/react-stripe-js";
import axios from "axios";

import { ChangeEvent, Dispatch, SetStateAction, useContext, useState } from "react";
import { IError, IOrder, IPayment} from "../checkout.d";
import ZipCheckoutButton from "./ZipCheckoutButton";
import AfterCheckoutButton from "./AfterCheckoutButton";
import StripeCheckoutButton from "./StripeCheckoutButton";
import BankCheckoutButton from "./BankCheckoutButton";
import Portal from "@/components/Portal";
import Loader from "@/components/Loader";
import { OrderContext, OrderType, OrderTypes } from "@/providers/OrderProvider";


export default function PaymentForm({
    formError, 
    setFormError, 
    loading, 
    setLoading,
    }: {
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
}) {
    
    const [selectedPayment, setSelectedPayment] = useState('bankTransfer');
    const {dispatch} = useContext(OrderContext);

    function handlePayment (e: ChangeEvent<HTMLInputElement>) {
        setSelectedPayment(e.target.value);
        dispatch({type: OrderTypes.Update, payload: {paymentMethod: e.target.value}})
        // setPayment({paymentMethod: e.target.value})
    }

  return (
    <>
        <Portal selector="myportal" show={loading}>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/70 z-[60] overflow-auto ">
                <div className="flex items-center justify-center flex-col h-full w-full">
                    {/* <Logoloader /> */}
                    <p className="text-white text-lg text-semibold">Order Processing...</p>
                    <Loader />
                </div>
            </div>
        </Portal>

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
                {selectedPayment === 'bankTransfer' && <BankCheckoutButton formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading}  />}
                {selectedPayment === 'afterPay' && <AfterCheckoutButton formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />}
                 {selectedPayment === 'zipPay' && <ZipCheckoutButton formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />}
                {
                    selectedPayment == 'stripe' && (
                        <StripeProvider>
                            <div className="bg-[#dfdcde] mb-4 text-sm p-3 text-gray-darker relative before:content-[''] before:absolute before:-top-2.5 before:left-4 before:w-5 before:h-5 before:rotate-45 before:bg-[#dfdcde] ">
                                <PaymentElement />
                            </div>
                            <StripeCheckoutButton formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />
                        </StripeProvider>
                    )
                }
    </div>
    </>
  )
}


export async function updateOrder ({
    orderId, email, token, paymentCancel, paymentStatus } : 
    {orderId: string; email: string; token?: string; paymentCancel?: boolean; paymentStatus?: string;}
) {
    const url = API_URL + `/orders/${orderId}`;

    const data = await axios.put(url, {data: {token: token ?? '', email, paymentCancel, paymentStatus}});

    return data;

}


export async function makeOrder (order : OrderType) {
    try {
        const url = API_URL + "/orders"
        const orderData = order?.pickupEnabled ? {
            firstName: order?.firstName,
            lastName: order?.lastName,
            email: order?.email,
            phone: order?.phone,
            paymentMethod: order.paymentMethod,
            pickupDate: order?.pickupDate,
            total: order?.total,
            subTotal: order?.subTotal,
            tax: order?.tax,
            shippingCost: order?.shippingCost,
            discount: order?.discount,
            deliveryStatus: 'noRequired',
            products: order.products,
            billingAddress: {
                state: order?.billState,
                city: order?.billCity,
                street: order?.billStreet,
                postcode: order?.billPostcode,
            }
        } : {
            ...order,
            pickupDate: null,
            deliveryStatus: 'uninitiated',
            deliveryAddress: {
                state: order?.state,
                city: order?.city,
                street: order?.street,
                postcode: order?.postcode,
            },
            billingAddress: {
                state: order?.billState,
                city: order?.billCity,
                street: order?.billStreet,
                postcode: order?.billPostcode,
            }
        };

        const {data:{data}} = await axios.post(url, {data: orderData});

        if(!data) {
            return null;
        }

        return data;
        
    } catch (error) {
        return null;
    }
}

export async function updateOrderPayment({email, paymentMethod, orderId}: {email: string; paymentMethod: string; orderId: string;}) {
    try {
        const url = API_URL + "/order-payment"
        

        const {data} = await axios.post(url, {data: {email, paymentMethod, orderId}});

        if(!data) {
            return null;
        }

        return data;
        
    } catch (error) {
        return null;
    } 
}

export function errorHandler (
    order: OrderType,
    formError: IError,
    setFormError: Dispatch<SetStateAction<IError>>) 
    {

    if(!order?.email) {
        setFormError({...formError, email: 'Email is required'})
        return true;
    }
    if(!order.firstName) {
        setFormError({...formError, firstName: 'Firstname is required'})
        return true;
    }
    if(!order.lastName) {
        setFormError({...formError, lastName: 'Lastname is required'})
        return true;
    }
    if(!order.phone) {
        setFormError({...formError, phone: 'Phone is required'})
        return true;
    }

    if(!order?.billCity) {
        setFormError({...formError, billingAddress: {...formError.billingAddress, city: 'Billing city is required'}})
        return true;
    }
    if(!order?.billState) {
        setFormError({...formError, billingAddress: {...formError.billingAddress, state: 'Billing state is required'}})
        return true;
    }
    if(!order?.billStreet) {
        setFormError({...formError, billingAddress: {...formError.billingAddress, street: 'Billing street is required'}})
        return true;
    }
    if(!order?.billPostcode) {
        setFormError({...formError, billingAddress: {...formError.billingAddress, postcode: 'Billing postcode is required'}})
        return true;
    }

    if(!order?.pickupEnabled) {
        if(!order?.city) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, city: 'City is required'}})
            return true;
        }
        
        if(!order?.state) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, state: 'state is required'}})
            return true;
        }

        if(!order?.street) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, street: 'Street is required'}})
            return true;
        }

        if(!order?.postcode) {
            setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, postcode: 'postcode is required'}})
            return true;
        }

        if(!order?.deliveryDate) {
            setFormError({...formError, deliveryDate: 'Please Provide Delivery date'})
            return true;
        }

    }  else {

        if(!order?.pickupDate) {
            setFormError({...formError, pickupDate: 'Please Provide Pickup date' })
            return;
        }
    }

    return false;
}