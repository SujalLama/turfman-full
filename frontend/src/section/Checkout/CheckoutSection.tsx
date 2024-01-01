"use client";

import Logoloader from "@/components/LogoLoader";

import { UserContext } from "@/providers/AuthProvider";

import { CartContext} from "@/providers/CartProvider";

import { useRouter, useSearchParams } from "next/navigation";
import { useContext, useEffect, useLayoutEffect, useState } from "react";

import ContactDetail from "./ContactDetail";
import BillingForm from "./BillingForm";
import PaymentForm from "./Payment/PaymentForm";
import OrderDetails from "./OrderDetails/OrderDetails";
import { IError, initialError } from "./checkout.d";
import OrderProvider, { OrderContext, OrderTypes } from "@/providers/OrderProvider";
import { API_URL } from "@/api/constants";
import axios from "axios";
import { getCartTotal } from "@/utils/cartTotal";
import DeliveryForm from "./DeliveryForm";


export default function CheckoutSection() {
    const [tax, setTax] = useState(0);
    


    async function getTaxInfo() {
        const url = API_URL + '/tax-rate';
        const {data:{data}} = await axios.get(url);


        if(!data) {
            return setTax(0);
        }
        
        return setTax(data.attributes.rate)
    }

    useEffect(() => {
        getTaxInfo();
    }, [])
    
  return (
    <OrderProvider>
        <CheckoutSectionContent tax={tax} />
    </OrderProvider>
  )
}

function CheckoutSectionContent ({tax}:{tax: number}) {
    const [loading, setLoading] = useState(false);
    const [formError, setFormError] = useState<IError>(initialError);
    const {state} = useContext(CartContext);
    const {state:user} = useContext(UserContext);
    const {dispatch} = useContext(OrderContext);
    const searchParams = useSearchParams();
    const [pageLoad, setPageLoad] = useState(true);
    const router = useRouter();
    const oldOrder = searchParams.get("orderId");

    
    useLayoutEffect(() => {

        if(state?.length === 0 && !oldOrder) {
          router.replace('/shop');
        }
        
        if(oldOrder) {

            getOrder(oldOrder);

        } else {
            if(user) {
                dispatch({type: OrderTypes.Update, payload: {
                    firstName : user?.username?.split(' ')[0] || '', 
                    lastName: user?.username?.split(' ')[1] || '', 
                    email: user?.email || '', 
                    phone: user?.phone || '' ,
                    billCity : user?.city || '', 
                    billPostcode: user?.postalCode || '', 
                    billStreet: user?.address || '', 
                    billState: user?.state || '',
                    deliveryNotes: '',
                    deliveryDate: null,
                }})
            }

            dispatch({type: OrderTypes.Update, payload: {
                total: 0,
                subTotal: getCartTotal(state),
                tax,
                shippingCost: 0,
                discount: 0,
                products: state,
            }})
            setPageLoad(false);
        }

        async function getOrder (id: string) {
            try {
                const url = API_URL + `/orders?filters[$or][1][paymentStatus][$eq]=cancelled&filters[$and][2][orderId][$eq]=${id}`
                const {data:{data}} = await axios.get(url);
                
                
                if(!data && data.length === 0) {
                    if(user) {
                        dispatch({type: OrderTypes.Update, payload: {
                            firstName : user?.username?.split(' ')[0] || '', 
                            lastName: user?.username?.split(' ')[1] || '', 
                            email: user?.email || '', 
                            phone: user?.phone || '' ,
                            billCity : user?.city || '', 
                            billPostcode: user?.postalCode || '', 
                            billStreet: user?.address || '', 
                            billState: user?.state || '',
                            deliveryNotes: '',
                            deliveryDate: null,
                        }})
                    }
                    
                    dispatch({type: OrderTypes.Update, payload: {
                        total: 0,
                        subTotal: getCartTotal(state),
                        tax,
                        shippingCost: 0,
                        discount: 0,
                        products: state,
                    }});
                    
                    setPageLoad(false);
                    return;
                }
    
                const orderData = data[0].attributes
                
                dispatch({type: OrderTypes.Add, payload: {
                    firstName : orderData?.firstName, 
                    lastName: orderData?.lastName, 
                    email: orderData?.email || '', 
                    phone: orderData?.phone || '',
                    city : orderData?.deliveryAddress?.city || '', 
                    postcode: orderData?.deliveryAddress?.postcode || '', 
                    street: orderData?.deliveryAddress?.street || '', 
                    state: orderData?.deliveryAddress?.state || '',
                    billCity : orderData?.billingAddress?.city || '', 
                    billPostcode: orderData?.billingAddress?.postcode || '', 
                    billStreet: orderData?.billingAddress?.street || '', 
                    billState: orderData?.billingAddress?.state || '',
                    deliveryDate: orderData?.deliveryDate ?? '',
                    deliveryNotes: orderData?.deliveryNotes ?? '',
                    pickupDate: orderData?.pickupDate ?? '',
                    pickupEnabled: orderData?.pickupDate ? true : false,
                    products: orderData.products,
                    total: orderData?.total,
                    subTotal: orderData?.subTotal,
                    tax: orderData?.tax,
                    shippingCost: orderData?.shippingCost,
                    discount: orderData?.discount,
                }})
                    
                    
                setPageLoad(false);
    
            } catch (error) {
                router.push("/shop");
            }
    
    
          }

      }, [router, state, user, oldOrder, dispatch, tax])

    if(pageLoad) {
        return <Logoloader />
    }

    return (
        <main className="relative">
            <div className="px-7.5 mx-auto  z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
                <div className="flex flex-col lg:flex-row">
                    <div className="my-8 lg:my-12 lg:w-[55%]  lg:pr-8">
                        <ContactDetail 
                            formError={formError} 
                            setFormError={setFormError} 
                            loading={loading || oldOrder !== null} 
                            />
                        <BillingForm
                            formError={formError} 
                            setFormError={setFormError} 
                            loading={loading || oldOrder !== null} 
                            />
                        <DeliveryForm
                            formError={formError} 
                            setFormError={setFormError} 
                            loading={loading || oldOrder !== null} 
                            />
                        <PaymentForm 
                            formError={formError} 
                            setFormError={setFormError} 
                            loading={loading} 
                            setLoading={setLoading}
                        />
                    </div>
                    <div className="  lg:w-[45%] lg:relative mb-8">
                        <div className="lg:pl-16 lg:sticky lg:top-6">
                            <OrderDetails 
                                loading={loading || oldOrder !== null} 
                            />
                        </div>
                    </div>
                    <div className="hidden lg:block bg-gray-100 absolute top-0 right-0 w-[calc(45%_+_15px)] h-full -z-10 "></div>
                </div>
            </div>
        </main>
    )
}



