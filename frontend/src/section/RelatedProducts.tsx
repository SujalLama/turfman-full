"use client";

import ProductCard, { IProductCardProps } from '@/components/ProductCard'
import QueryProvider from '@/providers/QueryProvider';
import { formatCategory } from '@/utils/dataFormatter';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function RelatedProducts({id}: {id?: number}) {

  if(!id) {
    return null;
  }

  return (
    <QueryProvider>
      <Products id={id} />
    </QueryProvider>
  )
}

function Products ({id}: {id: number;}) {
  const { isPending, error, data } = useQuery({
    queryKey: ['categories' + id],
    queryFn: async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product-categories/${id}?populate[products][populate]=*`;
    const {data: {data}} = await axios.get(url)
    return formatCategory(data);
    }
  })

  
  if(isPending) {
    return <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">loading..</div>
  }

  if(data?.products.length === 0) {
    return null;
  }

  return (
    <section className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <h2 className="font-bold text-gray-darker text-[28px] mb-10">Related Products</h2>
        <div className="md:flex md:flex-wrap md:items-start md:-mx-2.5">
            {
               data && data.products.map((product : any) => {
                return (
                <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
                xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px]" key={product.id}>
                    <ProductCard {...product}/>
                </div>
                )
            })
            }
        </div>
    </section>
  )
}
