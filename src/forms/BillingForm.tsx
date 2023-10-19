
export default function BillingForm() {
  return (
    <>
    <h3 className="font-bold text-gray-darker text-[28px] mb-4">Billing details</h3>
        <form className="mb-7.5">

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_first_name" className="mb-2 inline-block">First name&nbsp;<span className="text-red" title="required">*</span></label>
                    <input type="text" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary" 
                    name="billing_first_name" id="billing_first_name" placeholder="" value="" />
                </div>
    
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_company" className="mb-2 inline-block">Company name&nbsp;
                        <span className="optional">(optional)</span></label>
                    <input type="text" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary" name="billing_company" id="billing_company" placeholder="" value="" />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_address_1" className="mb-2 inline-block">Street address&nbsp;<span className="text-red" title="required">*</span></label>
                    <input type="text" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary" name="billing_address_1" id="billing_address_1" placeholder="House number and street name" value="" />
                </div>
                
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_city" className="mb-2 inline-block">Suburb&nbsp;<span className="text-red" title="required">*</span></label>
                    <input type="text" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary" name="billing_city" id="billing_city" placeholder="" value="" />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_state" className="mb-2 inline-block">State&nbsp;<span className="text-red" title="required">*</span></label>
                    <select name="billing_state" id="billing_state" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary" >
                        <option value="">Select an option…</option>
                        <option value="ACT">Australian Capital Territory</option>
                        <option value="NSW">New South Wales</option>
                        <option value="NT">Northern Territory</option>
                        <option value="QLD">Queensland</option>
                        <option value="SA">South Australia</option>
                        <option value="TAS">Tasmania</option>
                        <option value="VIC">Victoria</option>
                        <option value="WA">Western Australia</option>
                    </select>
                </div>
    
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_postcode" className="mb-2 inline-block">Postcode&nbsp;<span className="text-red" title="required">*</span></label>
                    <input type="text" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary " name="billing_postcode" id="billing_postcode" placeholder="" value="" />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_phone" className="mb-2 inline-block">Phone&nbsp;<span className="text-red" title="required">*</span></label>
                    <input type="tel" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary " name="billing_phone" id="billing_phone" placeholder="" value="" />
                </div>
    
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_email" className="mb-2 inline-block">Email address&nbsp;<span className="text-red" title="required">*</span></label>
                    <input type="email" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary " name="billing_email" id="billing_email" placeholder="" value="" />
                </div>
            </div>

            <div className="md:flex md:-mx-8">
                <div className="mb-4 md:w-1/2 md:mx-8">
                    <label htmlFor="billing_clientabn" className="mb-2 inline-block">Client ABN&nbsp;
                        <span className="optional">(optional)</span></label>
                    <input type="text" className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary " name="billing_clientabn" id="billing_clientabn" placeholder="Client ABN" value="" />
                </div>
    
                <div className="mb-4 md:w-1/2 md:mx-8">                
                    <label htmlFor="billing_ordernotes" className="mb-2 inline-block">Order notes
                        <span className="optional">(optional)</span></label>
                    <textarea
                        className="w-full border-1 border-gray/20 text-gray-darker py-[15px] px-[20px] rounded-[5px] focus:border-primary focus:ring-primary placeholder:text-gray-400" name="billing_clientabn" id="billing_clientabn" 
                        placeholder="Notes about your order, e.g. special notes for delivery." value=""></textarea>
                </div>
            </div>
        </form>
    </>
  )
}
