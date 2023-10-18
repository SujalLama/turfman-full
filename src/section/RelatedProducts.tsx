"use client";

import { productList } from './ProductList'
import ProductCard from '@/components/ProductCard'

export default function RelatedProducts() {
  return (
    <section className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <h2 className="font-bold text-gray-darker text-[28px] mb-10">Related Products</h2>
        <div className="md:flex md:flex-wrap md:items-start md:-mx-2.5">
            {
            productList.map(product => {
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
