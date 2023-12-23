"use client";

import Logoloader from "@/components/LogoLoader";

import { UserContext } from "@/providers/AuthProvider";

import { CartContext} from "@/providers/CartProvider";

import { useRouter } from "next/navigation";
import { useContext, useLayoutEffect, useState } from "react";

import ContactDetail from "./ContactDetail";
import BillingForm from "./BillingForm";
import PaymentForm from "./Payment/PaymentForm";
import OrderDetails from "./OrderDetails/OrderDetails";
import { IContact, IDelivery, IDeliveryAddress, IError, IOrderDetails, IPayment, IProduct, initialError } from "./checkout.d";
import OrderProvider from "@/providers/OrderProvider";


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


      
    if(pageLoad) {
        return <Logoloader />
    }
    
  return (
    <OrderProvider>
        <main className="relative">
            <div className="px-7.5 mx-auto  z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
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
                            <OrderDetails orderDetails={orderDetails} setOrderDetails={setOrderDetails} delivery={delivery} deliveryAddress={deliveryAddress} loading={loading} email={contact.email} />
                        </div>
                    </div>
                    <div className="hidden lg:block bg-gray-100 absolute top-0 right-0 w-[calc(45%_+_15px)] h-full -z-10 "></div>
                </div>
            </div>
        </main>
    </OrderProvider>
  )
}



