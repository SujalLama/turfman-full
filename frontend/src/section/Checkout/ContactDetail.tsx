import Input from "@/components/forms/Input";

import { Dispatch, SetStateAction } from "react";
import { IContact, IError } from "./checkout.d";

export default function ContactDetail ({contact, setContact, formError, setFormError, loading}: {
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
