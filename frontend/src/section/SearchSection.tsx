"use client";

import FaIcons from "@/components/FaIcons"
import Pagination from "@/components/Pagination";
import SearchCard from "@/components/SearchCard";
import Input from "@/components/forms/Input"
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react"

const searchedData = [
    {
        id: 'nidf',
        img: {
            src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
            alt: "winter-lawn-care"
        },
        category: "turf",
        title: "Quick Winter Lawn Care Tips",
        link: "/blogs/dfd",
        type: "product",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit numquam voluptatum fugit blanditiis tenetur assumenda quibusdam adipisci, enim dolor sequi.",
    },
    {
        id: "nid8383ud",
        img: {
            src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
            alt: "winter-lawn-care"
        },
        category: "turf",
        title: "Quick Winter Lawn Care Tips",
        link: "/blogs/dfd",
        type: "post",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit numquam voluptatum fugit blanditiis tenetur assumenda quibusdam adipisci, enim dolor sequi.",
    },
    {
        id: "nid093jdjf8",
        img: {
            src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
            alt: "winter-lawn-care"
        },
        category: "turf",
        title: "Quick Winter Lawn Care Tips",
        link: "/blogs/dfd",
        type: "post",
        desc: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit numquam voluptatum fugit blanditiis tenetur assumenda quibusdam adipisci, enim dolor sequi.",
    },
]

export default function SearchSection() {
    const searchParams = useSearchParams()
    const [search, setSearch] = useState(searchParams.get('s') ?? '');
    const router = useRouter();

  function goToSearch (e: FormEvent) {
    e.preventDefault();
    router.push(`/search?s=${search}`)
  }

  return (
    <>
    <form className="relative flex w-full mb-14" onSubmit={goToSearch}>
        <Input 
          className="h-[60px] pl-3.5 pr-20 mr-0 bg-white" 
          placeholder="Search ..." 
          onChange={(e: ChangeEvent<HTMLInputElement>) => {setSearch(e.target.value)}} 
          type="search" 
          name="" 
          error="" 
          value={search}
        />
        <button type="submit" className="absolute w-[70px] h-[60px] right-0 font-bold">
            <FaIcons icon="faSearch" />
        </button>
    </form>

        <div>
            {
                searchedData.map(searchedProd => {
                    return (
                        <SearchCard key={searchedProd.id} {...searchedProd} />
                    )
                })
            }

            {/* <Pagination /> */}
        </div>
    </>
  )
}
