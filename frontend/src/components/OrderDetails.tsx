"use client";

import { API_URL} from "@/api/constants";
import { CartContext, CartType } from "@/providers/CartProvider";
import { ShippingContext } from "@/providers/ShippingProvider";
import { IDelivery, IDeliveryAddress, IOrderDetails } from "@/section/CheckoutSection";
import { getCartTotal } from "@/utils/cartTotal";
import { IShippingCost } from "@/utils/dataFormatter";
import axios from "axios";
import Image from "next/image";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useContext, useEffect, useMemo, useState } from "react";
import Input from "./forms/Input";


const localArea = 'WA';

export default function OrderDetails({
    orderDetails, setOrderDetails,
    delivery, deliveryAddress
    }: {
        orderDetails: IOrderDetails; 
        setOrderDetails: Dispatch<SetStateAction<IOrderDetails>>,
        delivery: IDelivery,
        deliveryAddress: IDeliveryAddress;
    }) {

    const [baseLocation, setBaseLocation] = useState({postalCode: '', shippingDistance: []});
    
    const {state} = useContext(CartContext);

    useEffect(() => {
        setOrderDetails((prev) => ({...prev, subTotal: getCartTotal(state)}));
        getTaxInfo();
        getBaseLocationInfo();
    }, [state]);
      
    
    async function getTaxInfo() {
        const url = API_URL + '/tax-rate';
        const {data:{data}} = await axios.get(url);

        if(!data) {
            return setOrderDetails((prev) => ({...prev, tax: 0}));
        }
        
        setOrderDetails((prev) => ({...prev, tax: data.attributes.rate}));
    }

    async function getBaseLocationInfo() {
        const url = API_URL + '/shipping-rate?populate=*';
        const {data:{data}} = await axios.get(url);

        if(!data) {
            setBaseLocation({postalCode: '', shippingDistance: []});
            return;
        }

        setBaseLocation({postalCode: data.attributes.postalCode, shippingDistance: data.attributes.shippingDistance});
    }

    if(!state.length) {
        return null;
    }

  return (
    <div className="mb-6 ">
        <div>
            <div className="lg:mt-14 pt-6 lg:pt-0 border-t lg:border-t-0">
                <h3 className="font-bold text-gray-darker text-2xl mb-4 lg:hidden">Order summary</h3>
                {
                    state.map(cartItem => {
                        const {id, img, name, quantity, price} = cartItem
                        
                        return (
                            <div key={id} className="mb-4 flex items-center">
                                <div className="w-16 h-16 block border-2 relative">
                                    <Image 
                                        width="300" 
                                        height="300" 
                                        src={img?.src ?? ''} 
                                        className="w-full h-full object-cover object-center" 
                                        alt={img?.alt ?? ''} 
                                        loading="lazy" />

                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-gray-500 rounded-full text-white text-center">
                                        <span className="text-sm leading-6">{quantity ?? 0}</span>
                                    </div>
                                </div>						
                                
                    
                                <div className=" p-4 flex-1 text-center md:text-left">
                                    <span className="text-sm  text-black">{name}</span>					
                                </div>

                                <div className="text-black  p-4">
                                    <span>${((quantity ?? 0) * (price ?? 0)).toFixed(2)}</span>						
                                </div>
                            </div>
                        )
                    })
                }
            </div>
                
            <OrderDetailsCard orderDetails={orderDetails} setOrderDetails={setOrderDetails} baseLocation={baseLocation} delivery={delivery} deliveryAddress={deliveryAddress} />
        </div>
    </div>
  )
}


function calculateDistance(base: any, selectedCode: string) {
    const distance = compareDistanceUsingPostCode(base.postalCode, selectedCode)

    const baseRate = base.shippingDistance.filter((dis : any) => (distance > dis.from && distance <= dis.to ))

    if(baseRate.length === 0) {
        return {msg: `No feasible: ${distance} km`, rate: 0};
    }

    return {msg: `Two way (${distance} km)`, rate: baseRate[0].rate};
}

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

function OrderDetailsCard ({orderDetails, setOrderDetails, baseLocation, delivery, deliveryAddress}: {
    orderDetails: IOrderDetails; setOrderDetails: Dispatch<SetStateAction<IOrderDetails>>;
    baseLocation: {postalCode: string; shippingDistance: never[]}, delivery : IDelivery, deliveryAddress: IDeliveryAddress
}) {
    const [shippingCost, setShippingCost] = useState<{rate:number; msg: string;}>({rate:0, msg: ''});
    const {state:shipping} = useContext(ShippingContext);
    
    

    useEffect(() => {
        setShippingCost((_) => {
            return calculateShipping()
        });

        function calculateShipping () {
            if(delivery.pickupEnabled) {
                return {msg: 'Local Pickup', rate: 0}
            }

            const data = shipping.map(item => {

                if(item?.type === "distance") {
                    return calculateDistance(baseLocation, deliveryAddress.postcode);
                }
            
                // if there is no available outside delivery
                if(item?.onlyLocally === true) {
                    return {msg: "Only deliver locally", rate:item.localRate ?? 0}
                }

                // if user choose the local area even the outside delivery is available
                if(!item?.onlyLocally && deliveryAddress.state === localArea) {
                    return {msg: "", rate: item?.localRate ?? 0}
                }
    
                
                // if the user choose outside area, then get the cost of outside delivery
                return {msg: "",  rate: item?.outsideRate ?? 0};
    
            }).sort((a, b) => b.rate - a.rate)
            
            return data[0];
}
    }, [shipping, baseLocation, delivery, deliveryAddress])


    useEffect(() => {
        setOrderDetails((prev) => ({...prev, shippingCost: shippingCost.rate, total: shippingCost?.rate + orderDetails.subTotal + orderDetails.tax - orderDetails.discount}))
    }, [shippingCost])

    

    


    const calculatedShippingCost = {rate: 0, msg: ''}

    return (
        <>
        <div className="my-8">
                    <Coupon orderDetails={orderDetails} setOrderDetails={setOrderDetails}  />
                </div>


                <div className="text-black text-sm">
                    <div className="flex justify-between gap-2 my-2">
                        <span>Subtotal</span>
                        <span className="font-semibold">${orderDetails.subTotal.toFixed(2)}</span>
                    </div>

                    <ShippingCalculate 
                        shippingCost={shippingCost} 
                        orderDetails={orderDetails} setOrderDetails={setOrderDetails} 
                        
                    />
                    
                    
                </div>
        </>
    )
}

function ShippingCalculate ({shippingCost, orderDetails, setOrderDetails}:{shippingCost: {msg: string; rate:number}, orderDetails: IOrderDetails; setOrderDetails: Dispatch<SetStateAction<IOrderDetails>>}) {
    
    return (
        <>
            {orderDetails.discount ? <div className="flex justify-between gap-2 my-2">
                <span>Discount</span>
                <span>-${orderDetails.discount}</span>
            </div> : null}

            <div className="flex justify-between items-end gap-2 my-2">
                <span>Shipping</span>

                <div className="text-right">
                    {shippingCost?.msg && <><span className="text-gray-text text-sm mb-2" >
                        {shippingCost.msg}
                    </span><br /></>}
                    <span className="font-semibold">{`$${shippingCost?.rate.toFixed(2)}` ?? <span className="text-xs text-gray-text font-semibold">Enter shipping address</span>}</span>
                </div>

            </div>

            <div className="flex justify-between gap-2 my-2">
                <span>Tax</span>
                <span>${orderDetails.tax}</span>
            </div>

            <div className="flex justify-between gap-2 my-1.5 font-semibold text-base">
                <span className="">Total</span>
                <span>${orderDetails.total.toFixed(2)}</span>
            </div>
            </>
    )
}

function Coupon ({orderDetails, setOrderDetails}:{orderDetails: IOrderDetails; setOrderDetails: Dispatch<SetStateAction<IOrderDetails>>}) {
    const [coupon, setCoupon] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

  
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        setError('');
        setCoupon(e.target.value);
    };
  
    const handleSubmit = async (e : FormEvent) => {
      e.preventDefault();

      await getCoupon(coupon);
      
    };
  

    async function getCoupon(coupon: string) {
        setLoading(true);
        setError('');
        const currentDate = formatDateForCoupon(new Date());

        const url = API_URL + `/discounts?filters[$and][0][code][$eq]=${coupon}&filters[$and][1][startDate][$lte]=${currentDate}&filters[$and][1][endDate][$gte]=${currentDate}`;

        const {data:{data}} = await axios.get(url);

        setLoading(false);
        
        if(!data || data.length === 0) {
            setError('Invalid')
            return setOrderDetails({...orderDetails, discount: 0})
        }
        
        if(data[0].attributes.count >= data[0].attributes.maxCount) {
            setError('invalid')
            return setOrderDetails({...orderDetails, discount: 0})
        }

        console.log(data[0].attributes.rate);
        
        return setOrderDetails({...orderDetails, discount: (data[0].attributes.rate / 100) * orderDetails.subTotal})
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
                /> 
            </div>
            <button 
                type="submit" 
                className="block flex-2 bg-primary hover:bg-gray-darker disabled:bg-gray disabled:cursor-not-allowed lg:mt-0 text-center py-[15px] px-[12px] text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase transition-colors duration-500 ease-in-out" 
                name="apply_coupon" 
                value="Apply coupon"
                disabled={!coupon || loading}
                >
                Apply 
            </button>
        </form>
    )
}

// Function to get latitude and longitude coordinates for a given postal code using Google Maps Geocoding API
/*async function getCoordinatesForPostalCode(postalCode) {
    const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(postalCode)}&key=${apiKey}`;
  
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
  
      if (data.status === 'OK' && data.results.length > 0) {
        const location = data.results[0].geometry.location;
        return { lat: location.lat, lon: location.lng };
      } else {
        throw new Error('Failed to retrieve coordinates.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  }
  
  // Haversine formula to calculate distance between two points on Earth
  function calculateDistance(lat1, lon1, lat2, lon2) {
    // ... (same as in the previous example)
  }
  
  // Example postal codes
  const postalCode1 = '2000'; // Sydney, Australia
  const postalCode2 = '10001'; // New York, USA
  
  // Get coordinates for the postal codes
  const coordinates1 = await getCoordinatesForPostalCode(postalCode1);
  const coordinates2 = await getCoordinatesForPostalCode(postalCode2);
  
  if (coordinates1 && coordinates2) {
    // Calculate distance
    const distance = calculateDistance(
      coordinates1.lat,
      coordinates1.lon,
      coordinates2.lat,
      coordinates2.lon
    );
  
    console.log(`Distance between the two postal codes: ${distance.toFixed(2)} km`);
  } else {
    console.log('Failed to retrieve coordinates for one or more postal codes.');
  }
  */


//   Find postcode for city or region of a country
/*
// Function to get postal code for a region or state in a country using Google Maps Geocoding API
async function getPostalCodeForRegionInCountry(region, country) {
  const apiKey = 'YOUR_GOOGLE_MAPS_API_KEY'; // Replace with your API key
  const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(`${region}, ${country}`)}&key=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data.status === 'OK' && data.results.length > 0) {
      const postalCodeComponent = data.results[0].address_components.find(component =>
        component.types.includes('postal_code')
      );

      if (postalCodeComponent) {
        return postalCodeComponent.long_name;
      } else {
        throw new Error('Postal code not found in the API response.');
      }
    } else {
      throw new Error('Failed to retrieve postal code.');
    }
  } catch (error) {
    console.error('Error:', error.message);
    return null;
  }
}

// Example region and country
const region = 'New South Wales';
const country = 'Australia';

// Get postal code for the region in the country
const postalCode = await getPostalCodeForRegionInCountry(region, country);

if (postalCode) {
  console.log(`Postal code for ${region}, ${country}: ${postalCode}`);
} else {
  console.log('Failed to retrieve postal code for the region in the country.');
}
*/