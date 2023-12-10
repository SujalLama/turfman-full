import ProductGallery from '@/components/ProductGallery';
import CartForm from '@/forms/CartForm';
import MultipleCartForm from '@/forms/MultipleCartForm';
import { IShippingCost, ProductVariantType } from '@/utils/dataFormatter';
import Link from 'next/link';
import ProductTabs, { ITab } from './ProductTabs';

export type ImageType = {src: string; alt: string;}

export type ProductOptionType = {id: number; name: string; value: string; description: string;};

export interface ISingleProduct {
    productId: number;
    id: number;
    images: ImageType[],
    name: string;
    price: number | [number, number];
    stock: number;
    unit: string;
    desc: string;
    slug: string;
    category: {id: number, slug: string, name: string;};
    option: boolean;
    sku: string | string[];
    tags: {id: number, name: string; slug: string;}[];
    productOptions: {label: string; options: ProductOptionType[]};
    productVariants: ProductVariantType;
    fullDescription: ITab[],
    shippingCost: IShippingCost,
    popularity: number,
}


export default function SingleProductContent({data}: {data: ISingleProduct | null}) {

  if(!data) {
    return null;
  }

  return (
    <>
    <div className="md:flex md:-mx-6 lg:-mx-8 mb-10">
        <div className="md:w-1/2  md:px-6 lg:px-8 mb-6 md:mb-0">
            <ProductGallery images={data.images} />
        </div>
    
        <div className="md:w-1/2 md:px-6 lg:px-8">
            <h1 className="text-[26px] text-gray-darker font-bold leading-tight">
                {data.name}
            </h1>
            {data.price ? <p className="pt-4 text-lg">
              {
                (typeof(data.price) === "object") 
                ? (<span>${data.price[0]} - ${data.price[1]}</span>) : <span>${data.price}</span>
              }
              <span className='pl-2'>per {data.unit}</span>
            </p> : null}

            <div className="mt-4 mb-10">
                <p>{data.desc}</p>
            </div>
            
            
            {
              data.option 
              ? (
                  <MultipleCartForm 
                    label={data.productOptions.label}
                    options={data.productOptions.options} 
                    productVariants={data.productVariants}
                    img={data.images[0]}
                    link={data.slug} 
                    name={data.name}
                    shippingCost={data.shippingCost}
                    popularity={data.popularity}
                    productId={data.productId}
                  />)
              : (
                  <CartForm 
                    price={typeof(data?.price) === "number" ? data.price : 0} 
                    img={data.images[0]} stock={data.stock} id={data.id} 
                    link={data.slug} name={data.name}
                    shippingCost={data.shippingCost}
                    productId={data.productId}
                    popularity={data.popularity}
                  />)
            }
    
            <div>
                    {
                    (typeof(data.sku) !== "object") ?
                        <span className="mr-4">
                            <span className="font-semibold mr-2">SKU:</span>
                            <span>{data.sku}</span>
                        </span>
                          :  null 
                    }  
                <span className="">
                    <span className="font-semibold mr-2">Category:</span> 
                    <Link 
                        href={`/shop?category=${data.category.slug}`} className='hover:text-primary' rel="tag">
                            {data.category.name}
                    </Link>
                </span>

                {
                  data.tags.length > 0 ? <div className='mt-1'>
                    <span className='font-semibold mr-2'>Tags:</span>
                    {data.tags.map((tag, i) => (
                      <Link 
                        key={tag.id} 
                        className='hover:text-primary' 
                        href={`/shop?tags=${tag.slug}`}>
                          {tag.name} 

                          {data.tags.length - 1 !== i ? ", " : null}
                      </Link>))}
                  </div> : null
                }
            </div>
        </div>
    </div>
    <ProductTabs tabs={data.fullDescription} />
    </>
  )
}
