import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { API_URL } from "@/api/constants";
import axios, { AxiosError } from "axios";
import Input from "@/components/forms/Input";
import { OrderContext, OrderTypes } from "@/providers/OrderProvider";

export default function Coupon ({
        formLoading, 
        shippingCost, subTotal, tax, discount
    }:{
        formLoading: boolean,
        shippingCost: number; subTotal: number; tax: number; discount: number; 
    }) {
    
    const {state:order, dispatch} = useContext(OrderContext);
    const [coupon, setCoupon] = useState('');
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
  
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setError('');
        setCoupon(e.target.value);
    };
  
    const handleSubmit = async (e : FormEvent) => {
        try {
            e.preventDefault();

            setLoading(true);
            setError('');
            

            const currentDate = formatDateForCoupon(new Date());

            const url = API_URL + `/discounts?filters[$and][0][code][$eq]=${coupon}&filters[$and][1][startDate][$lte]=${currentDate}&filters[$and][1][endDate][$gte]=${currentDate}`;
    
            const {data:{data}} = await axios.get(url);

            if(!data || data.length === 0) {
                setLoading(false);
                setError('Invalid Coupon')
                return;
            }
            
            if(data[0].attributes.count >= data[0].attributes.maxCount) {
                setLoading(false);
                setError('Invalid Coupon');
                return;
            }
    
    
            const updateUrl = API_URL + `/discounts/${data[0]?.id}`
            const {data:updateData} = await axios.put(updateUrl, {
                "data": {
                    email: order?.email,
                    code: coupon,
                    count : data[0].attributes.count + 1
                    
                }});
    
            if(!updateData) {
                setLoading(false);
                setError('Not applicable.')
                return;
            }

            setSuccess(true);
            
            dispatch({type: OrderTypes.Update, payload: {discount: (updateData?.rate / 100) * subTotal ?? 0}})


        } catch(error) {

            const {response } = error as AxiosError;
            const data = response?.data as any;

            const errorMessage = data.error.message as string;
            
            setError(errorMessage);
            setLoading(false);
        }
    }

    function formatDateForCoupon (date: Date) {

        return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2,'0')}`
    
    }

    
    return (
        <form className="flex gap-4 flex-col md:flex-row md:items-start" onSubmit={handleSubmit}>
            <div className="flex-1">
                <Input 
                    type="text" 
                    name="coupon_code" 
                    className=" border-1 border-gray/20 text-gray-darker py-[12px] px-[11px] rounded-[5px] focus:border-primary focus:ring-primary placeholder:text-black/30" 
                    error={error}
                    value={coupon}
                    placeholder="Coupon code"
                    onChange={handleChange}
                    disabled={loading || formLoading || success}
                /> 
            </div>
            <button 
                type="submit" 
                className="block flex-2 bg-primary hover:bg-gray-darker disabled:bg-gray disabled:cursor-not-allowed lg:mt-0 text-center py-[15px] px-[12px] text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase transition-colors duration-500 ease-in-out" 
                name="apply_coupon" 
                value="Apply coupon"
                disabled={!coupon || loading || formLoading || (error !== '') || success}>
                Apply 
            </button>
        </form>
    )
}