import CartForm from '@/forms/CartForm';
import Image from 'next/image'
import Link from 'next/link';

export interface ISingleProduct {
    img: {
        src: string;
        alt: string;
    },
    name: string;
    minPrice: number;
    maxPrice: number;
    desc: string;
    quantities: number[];
    sku: string;
    category: string;
}

export default function SingleProductContent({data}: {data: ISingleProduct}) {
  return (
    <div className="md:flex md:-mx-6 lg:-mx-8 mb-10">
        <div className="md:w-1/2 lg:w-[40%] md:px-6 lg:px-8 mb-6 md:mb-0">
            <Image 
                width="435" 
                height="614" 
                src={data.img.src} 
                className="w-full rounded-[5px]" 
                alt={data.img.alt} 
            />
        </div>
    
        <div className="md:w-1/2 md:px-6 lg:px-8">
            <h1 className="text-[26px] text-gray-darker font-bold leading-tight">
                {data.name}
            </h1>
            <p className="py-4 text-lg">${data.minPrice} – ${data.maxPrice}</p>

            <div className="mb-10">
                <p>{data.desc}</p>
            </div>
            
            <CartForm options={data.quantities.map(quantity => ({value: `${quantity.toString()}kg`, name: `${quantity.toString()}kg`}))} />
            
    
            <div>
                <span className="mr-4">
                    <span className="font-semibold">SKU:</span>
                    <span>{data.sku}</span>
                </span>
                <span className="">
                    <span className="font-semibold">Category:</span> 
                    <Link 
                        href={'/shop?category=fertilizer'} rel="tag">
                            {data.category}
                    </Link>
                </span>
            </div>
        </div>
    </div>
  )
}
