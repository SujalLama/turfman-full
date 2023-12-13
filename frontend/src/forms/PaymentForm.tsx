'use client';

import { API_URL, SITE_URL } from "@/api/constants";
import CheckoutButton, { ICheckoutButton } from "@/components/CheckoutButton";
import FaIcons from "@/components/FaIcons";
import RadioButton from "@/components/forms/RadioButton";
import { localStoreCartKey } from "@/providers/CartProvider";
import { localStoreShippingKey } from "@/providers/ShippingProvider";
import StripeProvider from "@/providers/StripeProvider";
import { IError, IOrder, IPayment, initialError } from "@/section/CheckoutSection";
import { removeFromStore } from "@/utils/localStorage";
import { PaymentElement} from "@stripe/react-stripe-js";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";

import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";

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

                        {
                            selectedPayment == 'stripe' && (
                                <StripeProvider total={order.total}>
                                    <StripePayment />
                                    <CheckoutButton order={order} formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />
                                </StripeProvider>
                            )
                        }
                    </li>
                </ul>
                {selectedPayment !== 'stripe' && <BankCheckoutButton order={order} formError={formError} setFormError={setFormError} loading={loading} setLoading={setLoading} />}
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


function BankCheckoutButton({className, order, formError, setFormError, loading, setLoading}: ICheckoutButton) {
    
    const router = useRouter();

    console.log(formError);

    async function checkoutHandler () {
        try {
            setFormError(initialError);

            if(!order.email) {
                setFormError({...formError, email: 'Email is required'})
                return;
            }

            if(!order.pickupEnabled) {
                if(!order.deliveryAddress.city) {
                    setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, city: 'City is required'}})
                    return;
                }
                
                if(!order.deliveryAddress.state) {
                    setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, state: 'state is required'}})
                    return;
                }
        
                if(!order.deliveryAddress.street) {
                    setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, street: 'Street is required'}})
                    return;
                }
        
                if(!order.deliveryAddress.postcode) {
                    setFormError({...formError, deliveryAddress: {...formError.deliveryAddress, postcode: 'postcode is required'}})
                    return;
                }

                if(!order.deliveryDate) {
                    setFormError({...formError, deliveryDate: 'Please Provide Delivery date' })
                    return;
                }

            } else {

                if(!order.pickupDate) {
                    setFormError({...formError, pickupDate: 'Please Provide Pickup date' })
                    return;
                }
            }


                setLoading(true);

                // order
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
                    setFormError({...formError, payment: 'Order is not made'})
                    return;
                }


                removeFromStore(localStoreCartKey);
                removeFromStore(localStoreShippingKey);

                router.push(`/payment-confirmation?success=true&orderId=${data.id}`)
            
            setLoading(false);
    
            
        } catch(error) {
            const {response } = error as AxiosError;
            const data = response?.data as any;

            const errorMessage = data?.error?.message as string ?? 'Error ';
            
            setFormError({...formError , payment: errorMessage});
            setLoading(false);
        }
    }

    return (
        <>
        {formError.payment && <p className="text-red mt-6">{formError.payment}</p>}
        <button 
            type="submit" 
            className={`bg-primary py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] disabled:cursor-not-allowed disabled:bg-gray-400 font-bold uppercase w-full mt-8 cursor-pointer hover:bg-gray-darker transition-colors duration-500 ease-in-out ${className ?? ""}`}
            onClick={checkoutHandler}
            disabled={loading}
            >
            Make Order
        </button>
        </>
    )
}