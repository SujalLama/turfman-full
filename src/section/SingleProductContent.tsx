import CartForm from '@/forms/CartForm';
import Image from 'next/image'
import Link from 'next/link';
import React from 'react'

const singleProductData = {
    img: {
        src: "https://theturfman.com.au/wp-content/uploads/2020/09/multi-grow.jpg",
        alt: "cheap-multi-grow-organic-fertiliser"
    },
    name: "organic 2000 Multigrow",
    minPrice: 5.00,
    maxPrice: 25.00,
    desc: 'Multigrow is pelleted sawdust. bedded poultry manure and naturally composted.',
    quantities: [
        2,5,15,25
    ],
    sku: 'FR101',
    category: 'Fertilizer'
}
export default function SingleProductContent() {
  return (
    <div className="md:flex md:-mx-6 lg:-mx-8 mb-10">
        <div className="md:w-1/2 lg:w-[40%] md:px-6 lg:px-8 mb-6 md:mb-0">
            <Image 
                width="435" 
                height="614" 
                src={singleProductData.img.src} 
                className="w-full rounded-[5px]" 
                alt={singleProductData.img.alt} 
            />
        </div>
    
        <div className="md:w-1/2 md:px-6 lg:px-8">
            <h1 className="text-[26px] text-gray-darker font-bold leading-tight">
                {singleProductData.name}
            </h1>
            <p className="py-4 text-lg">${singleProductData.minPrice} – ${singleProductData.maxPrice}</p>

            <div className="mb-10">
                <p>{singleProductData.desc}</p>
            </div>
            
            <CartForm options={singleProductData.quantities.map(quantity => ({value: `${quantity.toString()}kg`, name: `${quantity.toString()}kg`}))} />
            
    
            <div>
                <span className="mr-4">
                    <span className="font-semibold">SKU:</span>
                    <span>{singleProductData.sku}</span>
                </span>
                <span className="">
                    <span className="font-semibold">Category:</span> 
                    <Link 
                        href={'/shop?category=fertilizer'} rel="tag">
                            {singleProductData.category}
                    </Link>
                </span>
            </div>
        </div>
    </div>
  )
}
