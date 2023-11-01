"use client";

import Pagination from "@/components/Pagination";
import ProductCard, { IProductCardProps } from "@/components/ProductCard";
import Select from "@/components/forms/Select";
import { formatProducts } from "@/utils/dataFormatter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const productList : IProductCardProps[] = [
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 0,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 0,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 20,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 10,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 0,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 0,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 0,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 12,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 10,
        id: "34349f"
    },
    {
        img: {src: "https://theturfman.com.au/wp-content/uploads/2020/08/turf-type-300x300.jpg", alt: "turf type"},
        name: "Cape Soft leaf Buffalo",
        desc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by <a href="https://theturfman.com.au/">TheTurfMan</a> has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        link: '/shop/334',
        price: 3.5,
        stock: 10,
        id: "34349f"
    },
]

export default function ProductList() {
  
  const { isPending, error, data } = useQuery({
    queryKey: ['products'],
    queryFn: async () => {
    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?populate[0]=product_variants&populate[1]=product_images`;
    
    const {data:{data}} = await axios.get(url)
    
    return formatProducts(data);
    }
  })


  if (isPending) return (
      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] 
      large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        Loading...
      </div>
  )

  if (error) return (
      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] 
        large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
      {'An error has occurred: ' + error.message}
      </div>
    )

    

  return (
    <section className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] 
    large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
      <div className="md:flex mb-14 md:items-center md:justify-between">
          <p className="mb-4 md:mb-0 md:mr-8">Showing 1-16 of 23 results</p>

          <Select options={[
            {value: "menu_order", name: "Default sorting"},
            {value: "popularity", name: "Sort by popularity"},
            {value: "date", name: "Sort by latest"},
            {value: "price", name: "Sort by price: low to high"},
            {value: "price-desc", name: "Sort by price: high to low"},
          ]} 
          name="orderby" 
          value=""
          onChange={() => {return ""}}
          className="md:w-auto"
          />
      </div>

      <div className="md:flex md:flex-wrap md:items-start md:-mx-2.5">
        {
          (data && data?.length > 1) && data?.map(product => {
            return (
              <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
              xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px]" key={product.id}>
                <ProductCard {...product}/>
              </div>
            )
          })
        }
      </div>
        <Pagination />
    </section>
  )
}
