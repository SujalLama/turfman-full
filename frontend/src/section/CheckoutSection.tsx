"use client";

import OrderDetails from "@/components/OrderDetails";
import Input from "@/components/forms/Input";
import BillingForm from "@/forms/BillingForm";
import PaymentForm from "@/forms/PaymentForm";
import { UserContext } from "@/providers/AuthProvider";

import { CartContext, CartType } from "@/providers/CartProvider";

import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext, useLayoutEffect, useState } from "react";

export interface IDeliveryAddress {
    state: string; 
    postcode: string; 
    street: string; 
    city: string;
}

export interface IProduct {
    products: CartType[];
}

export interface IContact {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export interface IDelivery {
    deliveryDate: Date | null;
    pickupEnabled: boolean;
    pickupDate: Date | null;
    deliveryNotes: string;
}

export interface IPayment {
    paymentMethod: string;
}

export interface IOrderDetails {
    total: number;
    subTotal: number;
    shippingCost: number;
    tax: number;
    discount: number 
}

export interface IError {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    payment: string;
    deliveryAddress: IDeliveryAddress,
    total: number;
    subTotal: number;
    shippingCost: number;
    tax: number;
    discount: number 
    paymentMethod: string;
    deliveryDate: Date | null;
    pickupEnabled: boolean;
    pickupDate: Date | null;
    deliveryNotes: string;
}

export interface IOrder {
    products: CartType[];
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    deliveryAddress: IDeliveryAddress,
    total: number;
    subTotal: number;
    shippingCost: number;
    tax: number;
    discount: number 
    paymentMethod: string;
    deliveryDate: Date | null;
    pickupEnabled: boolean;
    pickupDate: Date | null;
    deliveryNotes: string;
}


export const initialError : IError = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    payment: '',
    deliveryAddress: {state: '', postcode: '', street: '', city: ''},
    paymentMethod: '',
    deliveryDate: null,
    pickupEnabled : false,
    pickupDate: null,
    deliveryNotes: '',
    total: 0,
    subTotal: 0,
    tax: 0,
    shippingCost: 0,
    discount: 0,
}

export default function CheckoutSection() {
    const {state, dispatch} = useContext(CartContext);
    const {state:user} = useContext(UserContext);

    const [pageLoad, setPageLoad] = useState(true);
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<IError>(initialError);

    const [products, setProducts] = useState<IProduct>({
        products: [],
    });

    const [contact, setContact] = useState<IContact>({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
    });

    const [deliveryAddress, setDeliveryAddress] = useState<IDeliveryAddress>({
        state: '', postcode: '', street: '', city: ''
    });

    const [payment, setPayment] = useState<IPayment>({
        paymentMethod: '',
    });

    const [orderDetails, setOrderDetails] = useState<IOrderDetails>({
        total: 0,
        subTotal: 0,
        tax: 0,
        shippingCost: 0,
        discount: 0,
    });

    const [delivery, setDelivery] = useState<IDelivery>({
        deliveryDate: null,
        pickupEnabled : false,
        pickupDate: null,
        deliveryNotes: '',
    });
    


    useLayoutEffect(() => {
        if(state?.length === 0) {
          router.replace('/shop');
          
        } else {
            if(user) {
                
                setContact({firstName : user?.username?.split(' ')[0] || '', lastName: user?.username?.split(' ')[1] || '', email: user?.email || '', phone: user?.phone || '' })
                setDeliveryAddress({city : user?.city || '', postcode: user?.postalCode || '', street: user?.address || '', state: user?.state || '' })
            }
            setProducts({products: state})
            setPageLoad(false);
        }

      }, [router, state, user])

      console.log(contact)
      console.log(user)

    if(pageLoad) {
        return <div>Loading...</div>
    }
    
  return (
    
        <div className="flex flex-col lg:flex-row">
            <div className="my-8 lg:my-12 lg:w-[55%]  lg:pr-8">
                <ContactDetail 
                    contact={contact} 
                    setContact={setContact} 
                    formError={formError} 
                    setFormError={setFormError} 
                    loading={loading} />
                <BillingForm 
                    deliveryAddress={deliveryAddress} 
                    delivery={delivery} 
                    setDeliveryAddress={setDeliveryAddress} 
                    setDelivery={setDelivery} 
                    formError={formError} 
                    setFormError={setFormError} 
                    loading={loading} />
                <PaymentForm 
                    order={{
                        ...products,
                        ...contact, 
                        deliveryAddress: deliveryAddress, 
                        ...delivery,
                        ...payment, 
                        ...orderDetails}} 
                        payment={payment} 
                        setPayment={setPayment} 
                        formError={formError} 
                        setFormError={setFormError} 
                        loading={loading} 
                        setLoading={setLoading}/>
            </div>
            <div className="  lg:w-[45%] lg:relative mb-8">
                <div className="lg:pl-16 lg:sticky lg:top-6">
                    <OrderDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails} delivery={delivery} deliveryAddress={deliveryAddress} />
                </div>
            </div>
            <div className="hidden lg:block bg-gray-100 absolute top-0 right-0 w-[calc(45%_+_15px)] h-full -z-10 "></div>
        </div>
    
  )
}

export function ContactDetail ({contact, setContact, formError, setFormError, loading}: {
    contact: IContact; setContact: Dispatch<SetStateAction<IContact>>
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
}) {
    return (
        <div>
            <h3 className="font-bold text-gray-darker text-2xl mb-4">Contact</h3>
            <form className="mb-8">

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="billing_first_name" className="mb-1 inline-block text-sm">First name&nbsp;</label>
                    <Input 
                        type="text" 
                        name="billing_first_name" 
                        placeholder="" 
                        value={contact.firstName}
                        onChange={(e) => setContact({...contact, firstName: e.target.value})}
                        disabled={loading}
                    />
                </div>
    
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="lastname" className="mb-1 inline-block text-sm">Last name&nbsp;
                        </label>
                    <Input 
                        type="text"
                        name="lastname" 
                        placeholder="" 
                        value={contact.lastName} 
                        onChange={(e) => setContact({...contact, lastName: e.target.value})} 
                        disabled={loading}
                        />
                </div>
            </div>

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="email" className="mb-1 inline-block text-sm">Email&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="email" 
                        placeholder="" 
                        value={contact.email}
                        error={formError.email}
                        onChange={(e) => {
                            setContact({...contact, email: e.target.value})
                            setFormError({...formError, email: ''})
                        }}
                        disabled={loading}
                    />
                </div>
    
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="phone" className="mb-1 inline-block text-sm">Phone&nbsp;
                        </label>
                    <Input 
                        type="text"
                        name="phone" 
                        placeholder="" 
                        value={contact.phone}
                        error=""
                        onChange={(e) => setContact({...contact, phone: e.target.value})} 
                        disabled={loading}
                        />
                </div>
            </div>
        </form>
        </div>
    )
}


