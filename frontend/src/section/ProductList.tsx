"use client";

import Pagination from "@/components/Pagination";
import ProductCard, { IProductCardProps } from "@/components/ProductCard";
import Select from "@/components/forms/Select";
import { formatProducts } from "@/utils/dataFormatter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const pageSize = 4;
export default function ProductList() {
  const[page, setPage] = useState<number>(1);
  const[sort, setSort] = useState('name:asc');
  const[category, setCategory] = useState('');

  const { 
    isPending,
    error,
    data,
    } = useQuery({
    queryKey: ['products', page, sort],
    queryFn: () => fetchProducts(page, sort),
  })

  async function fetchProducts(page: number, sort: string) {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?sort=${sort}&populate[0]=product_variants&populate[1]=product_images&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
    
    const {data:{data, meta}} = await axios.get(url)
    return {data: formatProducts(data), pagination: meta?.pagination};
  }



  if (error) return (
      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] 
        large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
      {'An error has occurred: ' + error.message}
      </div>
    )

    const totalPages = data?.pagination?.total ?? 0
    const lastPageOfResult = (page * pageSize) >= totalPages ? totalPages : page * pageSize;
    const firstPageOfResult = data?.data?.length ? ((lastPageOfResult - data?.data?.length) + 1) : 0
    

  return (
    <section className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] 
    large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
      <div className="md:flex mb-14 md:items-center md:justify-between">
          <p className="mb-4 md:mb-0 md:mr-8">Showing {firstPageOfResult} - {lastPageOfResult} of {totalPages} results</p>

          <Select 
            options={[
              {value: "name:asc", name: "Sort by name asc"},
              {value: "name:desc", name: "Sort by name desc"},
              {value: "updatedAt:desc", name: "Sort by latest"},
              {value: "product_variants.price", name: "Sort by price: low to high"},
              {value: "product_variants.price:desc", name: "Sort by price: high to low"},
            ]} 
            name="orderby" 
            value={sort}
            onChange={(e) => {setSort(e.target.value)}}
            className="md:w-auto pr-10"
          />
      </div>

      <div className="md:flex md:flex-wrap md:items-start md:-mx-2.5">
        {

            isPending ? (
              <>
              <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
              xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px]">
                <div className="animate-pulse">
                    <div className="h-[200px] relative bg-gray-50">
                    </div>
                    <div className="bg-gray-200 h-[150px]">
                    </div>
                </div>
              </div>
              <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
              xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px]">
                <div className="animate-pulse">
                    <div className="h-[200px] relative bg-gray-50">
                    </div>
                    <div className="bg-gray-200 h-[150px]">
                    </div>
                </div>
              </div>
              <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
              xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px]">
                <div className="animate-pulse">
                    <div className="h-[200px] relative bg-gray-50">
                    </div>
                    <div className="bg-gray-200 h-[150px]">
                    </div>
                </div>
              </div>
              </>
          ) :
          (data?.data && data?.data?.length > 0) && data?.data?.map(product => {
            return (
              <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
              xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px]" key={product.id}>
                <ProductCard {...product}/>
              </div>
            )
          })
        }
      </div>
        <Pagination pageNumber={page} setPageNumber={setPage} totalPages={data?.pagination?.pageCount} />
    </section>)
}
