import Input from "@/components/forms/Input";

import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { IContact, IError } from "./checkout.d";
import { OrderContext, OrderTypes } from "@/providers/OrderProvider";

export default function ContactDetail ({formError, setFormError, loading}: {
    formError: IError;
    setFormError: Dispatch<SetStateAction<IError>>;
    loading: boolean;
}) {
    const {state: order, dispatch} = useContext(OrderContext);

    const [contact, setContact] = useState<IContact>({
        firstName: order?.firstName ?? '',
        lastName: order?.lastName ?? '',
        email: order?.email ?? '',
        phone: order?.phone ?? '',
    });

    useEffect(() => {
        dispatch({type: OrderTypes.Update, payload: {...contact}})
    }, [contact, dispatch]);

    return (
        <div>
            <h3 className="font-bold text-gray-darker text-2xl mb-4">Contact</h3>
            <form className="mb-8">

            <div className="md:flex md:-mx-2">
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="billing_first_name" className="mb-1 inline-block text-sm">First name&nbsp;<span className="text-red" title="required">*</span></label>
                    <Input 
                        type="text" 
                        name="billing_first_name" 
                        error={formError.firstName}
                        value={contact.firstName}
                        onChange={(e) => {
                            setContact({...contact, firstName: e.target.value})
                            
                            setFormError({...formError, firstName: ''})
                        }}
                        disabled={loading}
                    />
                </div>
    
                <div className="mb-3 md:w-1/2 md:mx-2">
                    <label htmlFor="lastname" className="mb-1 inline-block text-sm">Last name&nbsp;<span className="text-red" title="required">*</span>
                        </label>
                    <Input 
                        type="text"
                        name="lastname" 
                        error={formError.lastName}
                        value={contact.lastName} 
                        onChange={(e) => {
                            setContact({...contact, lastName: e.target.value})
                            setFormError({...formError, lastName: ''})
                        }} 
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
                    <label htmlFor="phone" className="mb-1 inline-block text-sm">Phone&nbsp;<span className="text-red" title="required">*</span>
                        </label>
                    <Input 
                        type="text"
                        name="phone" 
                        value={contact.phone}
                        error={formError.phone}
                        onChange={(e) => {
                            setContact({...contact, phone: e.target.value})
                            setFormError({...formError, phone: ''})
                        }} 
                        disabled={loading}
                        />
                </div>
            </div>
        </form>
    </div>
    )
}
