"use client";

import { API_URL } from "@/api/constants";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select";
import QueryProvider from "@/providers/QueryProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChangeEvent, Dispatch, SetStateAction } from "react";
import { IShipmentDetail } from "./CartTotalForm";
import Loader from "@/components/Loader";

interface IShipmentProps {
    shippingDetail: IShipmentDetail,
    setShippingDetail: Dispatch<SetStateAction<IShipmentDetail>>,
}

export default function Shipment({shippingDetail, setShippingDetail} : IShipmentProps) {
    

    function changeHandler(e : ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const target = e.target;
        setShippingDetail({...shippingDetail, [target.name] : target.value})
    }

  return (
    <div>              
        <QueryProvider>
            <ShippingRegion changeHandler={changeHandler} shippingDetail={shippingDetail} />
        </QueryProvider>

        <div className="lg:flex lg:justify-between my-2">
            <label className="w-1/2">Suburb&nbsp;</label>
            <Input 
                type="text" 
                className="lg:flex-1" 
                value={shippingDetail.city} 
                placeholder="City" 
                name="city" 
                error="" 
                onChange={changeHandler}
            />

        </div>
        <div className="lg:flex lg:justify-between">
            <label className="w-1/2">Postcode&nbsp;</label>
            <Input 
                type="text" 
                className="lg:flex-1" 
                value={shippingDetail.postCode}
                placeholder="Postcode / ZIP" 
                name="postCode" 
                error="" 
                onChange={changeHandler} 
            />
        </div>
    
    </div>
  )
}

async function getShippingRegion() {
    const url = API_URL + '/product-setting?populate=*';
    
    const {data:{data}} = await axios.get(url);

    return formatShipping(data);
}

function formatShipping(data: any) {
    const {ShipmentOptions} = data.attributes;

    const options = ShipmentOptions.map((option : any) => ({name: option.name, value: option.name}));
    options.unshift({name: "Select an option", value: ""});

    return options ?? [];
}

function ShippingRegion ({
    shippingDetail, 
    changeHandler
}:{
    shippingDetail: IShipmentDetail; 
    changeHandler : (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}) {

    const {data, isPending} = useQuery({
        queryKey: ["shippingRegion"], 
        queryFn: () => getShippingRegion()});

    if(isPending) return <Loader />

    if(data.length == 0) return null;

    return (
        <div className="lg:flex lg:justify-between mt-4">
            <label className="w-1/2">State&nbsp;</label>
            <Select 
                name="state" 
                value={shippingDetail.state}
                options={data}
                onChange={changeHandler}
                className="lg:flex-1 mb-0"
            />
        </div>
    )
}