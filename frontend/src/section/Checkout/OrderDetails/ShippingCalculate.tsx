import { useContext, useEffect, useState } from "react";
import { ShippingContext } from "@/providers/ShippingProvider";
import ShippingTotal from "./ShippingTotal";
import { OrderContext, OrderTypes } from "@/providers/OrderProvider";
import { API_URL } from "@/api/constants";
import axios from "axios";

const localArea = 'WA';

function compareDistanceUsingPostCode(baseCode: string, selectedCode: string) {
    if(selectedCode === "6061") {
        return 14
    }

    if(selectedCode === "5051") {
        return 4
    }

    if(selectedCode === "4041") {
        return 35
    }

    return 100;
}

function calculateDistance(base: any, selectedCode: string) {
    const distance = compareDistanceUsingPostCode(base.postalCode, selectedCode)

    const baseRate = base.shippingDistance.filter((dis : any) => (distance > dis.from && distance <= dis.to ))

    if(baseRate.length === 0) {
        return {msg: `No feasible: ${distance} km`, rate: 0};
    }

    return {msg: `Two way (${distance} km)`, rate: baseRate[0].rate};
}

export default function ShippingCalculate ({shippingCost, subTotal, tax, discount}: {shippingCost: number; subTotal: number; tax: number; discount: number;}) {
    const [baseLocation, setBaseLocation] = useState<{postalCode: string; shippingDistance: []}>({postalCode: '', shippingDistance: []});
    
    
    useEffect(() => {
        getBaseLocationInfo();
        
    }, [])


    async function getBaseLocationInfo() {
        const url = API_URL + '/shipping-rate?populate=*';
        const {data:{data}} = await axios.get(url);

        if(!data) {
            setBaseLocation({postalCode: '', shippingDistance: []});
            return;
        }

        setBaseLocation({postalCode: data.attributes.postalCode, shippingDistance: data.attributes.shippingDistance});
    }


    return (
        <>
            {discount ? <div className="flex justify-between gap-2 my-2">
                <span>Discount</span>
                <span>-${discount}</span>
            </div> : null}

            <Shipping baseLocation={baseLocation} />

            <TaxCalculate />

            <ShippingTotal 
                discount={discount}
                tax={tax}
                subTotal={subTotal}
                shippingCost={shippingCost}
                />
            </>
    )
}

function Shipping ({baseLocation}: {baseLocation: {postalCode: string; shippingDistance: []}}) {
    const [shippingCost, setShippingCost] = useState<{rate:number; msg: string;}>({rate:  0, msg: ''});
    const {state:order, dispatch} = useContext(OrderContext);
    const {state:shipping} = useContext(ShippingContext);
    

    useEffect(() => {
        

        setShippingCost((_) => {
            return calculateShipping()
        });
        
        function calculateShipping () {
            if(order?.pickupEnabled) {
                return {msg: 'Local Pickup', rate: 0}
            }

            if(shipping.length === 0) {
                return {rate: order?.shippingCost ?? 0, msg: ''}
            }

            const data = shipping.map(item => {

                if(item?.type === "distance") {
                    return calculateDistance(baseLocation, order?.postcode ?? '');
                }
            
                // if there is no available outside delivery
                if(item?.onlyLocally === true) {
                    return {msg: "Only deliver locally", rate:item.localRate ?? 0}
                }

                // if user choose the local area even the outside delivery is available
                if(!item?.onlyLocally && order?.state === localArea) {
                    return {msg: "", rate: item?.localRate ?? 0}
                }
    
                
                // if the user choose outside area, then get the cost of outside delivery
                return {msg: "",  rate: item?.outsideRate ?? 0};
    
            }).sort((a, b) => b.rate - a.rate)[0]
            
            return data;
        }

    }, [shipping, baseLocation])

    useEffect(() => {
        dispatch({type: OrderTypes.Update, payload: {shippingCost: shippingCost.rate}})
    }, [ shippingCost, dispatch])

    return (
        <div className="flex justify-between items-end gap-2 my-2">
                <span>Shipping</span>

                <div className="text-right">
                    {shippingCost?.msg && <><span className="text-gray-text text-sm mb-2" >
                        {shippingCost.msg}
                    </span><br /></>}
                    <span className="font-semibold">{`$${shippingCost?.rate.toFixed(2) ?? 0}` ?? <span className="text-xs text-gray-text font-semibold">Enter shipping address</span>}</span>
                </div>

            </div>
    )
}

function TaxCalculate () {
    const {state:order} = useContext(OrderContext);
    
    return (
        <div className="flex justify-between gap-2 my-2">
            <span>Tax</span>
            <span>${order?.tax ?? 0}</span>
        </div>
    )
}