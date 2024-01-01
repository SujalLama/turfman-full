"use client";

import { API_URL} from "@/api/constants";
import { getCartTotal } from "@/utils/cartTotal";
import axios from "axios";
import Image from "next/image";
import { Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import {  IDeliveryAddress, IOrderDetails, IProduct } from "../checkout.d";
import { useSearchParams } from "next/navigation";
import OrderDetailsCard from "./OrderDetailsCard";
import { ShippingType } from "@/providers/ShippingProvider";
import { OrderContext } from "@/providers/OrderProvider";


export default function OrderDetails({
    loading,
    }: {
        loading: boolean;
    }) {


    const {state:order} = useContext(OrderContext);
      

    if(!order?.products?.length) {
        return null;
    }

    

  return (
    <div className="mb-6 ">
        <div>
            <div className="lg:mt-14 pt-6 lg:pt-0 border-t lg:border-t-0">
                <h3 className="font-bold text-gray-darker text-2xl mb-4 lg:hidden">Order summary</h3>
                {
                    order.products.map(cartItem => {
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
                
            <OrderDetailsCard 
                loading={loading}
            />
        </div>
    </div>
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