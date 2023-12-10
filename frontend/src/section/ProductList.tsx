"use client";

import Pagination from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import Select from "@/components/forms/Select";
import {formatProducts } from "@/utils/dataFormatter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

function getSort(sortKey : string) {
  switch(sortKey) {
    case "name-asc":
      return "name:asc";
    case "popularity":
      return "popularity:desc";
    case "latest-desc":
      return "updatedAt:desc";
    case "price-asc":
      return "product_variants.price:asc";
    case "price-desc":
      return "product_variants.price:desc";
    default:
      return ""
  }
}
async function fetchProducts(page: number, sort: string, category: string) {

  const newSort = getSort(sort);

  const paginateUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?sort=${newSort}&populate[0]=product_variants&populate[1]=product_images&populate[2]=product_category.deliveryOptions&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  const categoryUrl = paginateUrl + `&filters[product_category][slug][$eq]=${category}`;
  const priceSortUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?sort=${newSort}&populate[0]=product_variants&populate[1]=product_images&populate[2]=product_category.deliveryOptions&pagination[page]=${page}`;
  
  const url = category !== 'all' ? categoryUrl : (sort == "price-asc" || sort == "price-desc") ? priceSortUrl : paginateUrl;

  const {data:{data, meta}} = await axios.get(url);
  

  return {data: formatProducts(data), pagination: meta?.pagination};
}

async function fetchCategories() {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product-categories`;
  
  const {data:{data}} = await axios.get(url);
  
  return formatProductCategories(data);
}

function formatProductCategories(data:any) {
  const newCategories = data.map((category: any) => ({name: category.attributes.name, value: category.attributes.slug}))

  newCategories.unshift({name: 'Filter By Category', value: 'all'})
  return newCategories;
}

const pageSize = 4;

export default function ProductList() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const[page, setPage] = useState<number>(1);
  const[sort, setSort] = useState(searchParams.get('orderBy') ?? 'name:asc');
  const[category, setCategory] = useState(searchParams.get('category') ?? 'all');

  useEffect(() => {
    setPage(1);
  }, [category, sort])

  const { 
    isPending,
    error,
    data,
    } = useQuery({
    queryKey: ['products', page, sort, category],
    queryFn: () => fetchProducts(page, sort, category),
  })

  
  

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
      <div className="md:flex md:flex-row-reverse mb-14 md:items-center md:justify-between">
          

          <div className="flex flex-col items-end lg:flex-row">
            <SelectCategories category={category} setCategory={setCategory} />
            <Select 
              options={[
                {value: "name-asc", name: "Default Sorting"},
                {value: "popularity", name: "Sort by Popularity"},
                {value: "latest-desc", name: "Sort by latest"},
                {value: "price-asc", name: "Sort by price: low to high"},
                {value: "price-desc", name: "Sort by price: high to low"},
              ]} 
              name="orderby" 
              value={sort}
              onChange={(e) => {
                setSort(e.target.value)
                router.push(`?orderBy=${e.target.value}`)
                router.push(`?${searchParams.get('category') ? `category=${searchParams.get('category')}&` : ''}orderBy=${e.target.value}`)
              }}
              className="md:w-auto pr-10 lg:mb-0"
            />
          </div>

          <p className="mb-4 md:mb-0 md:mr-8">Showing {firstPageOfResult} - {lastPageOfResult} of {totalPages} results</p>
      </div>

              {isPending ? (
                <div className="md:flex md:flex-wrap  md:-mx-2.5">
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
                </div>
              )
                : (
                  <>
                  {(data?.data && data?.data?.length > 0) 

                    ? (<div className="md:flex md:flex-wrap  md:-mx-2.5">
                        {
                          data?.data?.map(product => {
                            return (
                              <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
                              xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px] flex flex-col" key={product.id}>
                                <ProductCard {...product}/>
                              </div>
                            )
                          }) 
                        }
                    </div>) 
                    
                    : (
                        <div className="text-center">Products are not available.</div>
                      )
                      }

                    {(data?.data && data.data.length > 0) && <Pagination pageNumber={page} setPageNumber={setPage} totalPages={data?.pagination?.pageCount} />}
                  </>
                )
            }
      
    </section>)
}

function SelectCategories ({category, setCategory}: {category: string; setCategory: Dispatch<SetStateAction<string>>}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { 
    isPending,
    error,
    data,
    } = useQuery({
    queryKey: ['categories'],
    queryFn: () => fetchCategories(),
  });


  if(isPending) {
    return <Select options={[{name: "Filter By Category", value: "all"}]} value="" className="md:w-auto pr-10 lg:mr-2 !mb-2 lg:!mb-0"/>
  }

  return (
    <Select 
        options={data} 
        name="orderby" 
        value={category}
        onChange={(e) => {
          setCategory(e.target.value)
          router.push(`?category=${e.target.value ?? 'all'}${searchParams.get('orderBy') ? `&orderBy=${searchParams.get('orderBy')}` : ''}`)
        }}
        className="md:w-auto pr-10 lg:mr-2 !mb-2 lg:!mb-0"
        />
  )
}