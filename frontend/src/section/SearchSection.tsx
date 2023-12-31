"use client";

import { API_URL } from "@/api/constants";
import FaIcons from "@/components/FaIcons"
import Logoloader from "@/components/LogoLoader";
import Pagination from "@/components/Pagination";
import SearchCard from "@/components/SearchCard";
import Input from "@/components/forms/Input"
import QueryProvider from "@/providers/QueryProvider";
import { ImageSizeType } from "@/utils/dataFormatter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction, useEffect, useState } from "react"

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
    const searchParams = useSearchParams();
    const [search, setSearch] = useState(searchParams.get('s') ?? '');
  

  return (
    <>    
        <SearchForm setSearch={setSearch} />
        <QueryProvider>
            <SearchedResults query={search} />
        </QueryProvider>  
    </>
  )
}

function SearchForm ({setSearch}: {setSearch: Dispatch<SetStateAction<string>>}) {

    const searchParams = useSearchParams();
    const [searchInput, setSearchInput] = useState(searchParams.get('s') ?? '');

    const router = useRouter();

    function goToSearch (e: FormEvent) {
        e.preventDefault();
        setSearch(searchInput);
        router.push(`/search?s=${searchInput}`)
      }

    return (
        <form className="relative flex w-full mb-14" onSubmit={goToSearch}>
            <Input 
                className="h-[60px] pl-3.5 pr-20 mr-0 bg-white" 
                placeholder="Search ..." 
                onChange={(e: ChangeEvent<HTMLInputElement>) => {setSearchInput(e.target.value)}} 
                type="search" 
                name="" 
                error="" 
                value={searchInput}
            />
            <button type="submit" className="absolute w-[70px] h-[60px] right-0 font-bold">
                <FaIcons icon="faSearch" />
            </button>
        </form>
    )
}

const pageSize = 5;
async function getSearchedResults(query: string, pageNumber: number) {
    const url = API_URL + `/fuzzy-search/search?query=${query}`+
                `&populate[posts][0]=cover&populate[products][1]=product_images`+
                `&populate[posts][2]=post_category&populate[products][3]=product_category`+
                `&pagination[products][pageSize]=${pageSize}&pagination[posts][pageSize]=${pageSize}`+
                `&pagination[products][page]=${pageNumber}&pagination[posts][page]=${pageNumber}`;

    const {data} = await axios.get(url);

    return formatSearchResults(data);
}

function formatSearchResults (data : any) {
    
    const newData : any[] = [];
    
    
    const {posts, products} = data;

    if(posts.data.length > 0) {
        posts.data.forEach((post : any) => {
            newData.push({
                id: post.id,
                img: formatImage('thumbnail', post.cover),
                title: post.title,
                desc: post.description,
                link: `/blogs/${post.slug}`,
                type: 'posts',
                category: {name: post?.post_category?.name, slug: post?.post_category?.slug}
            })
        })
    }

    if(products.data.length > 0) {
        products.data.forEach((product : any) => {
            newData.push({
                id: product.id,
                img: formatImage('thumbnail', product.product_images[0]),
                title: product.name,
                desc: product.short_desc,
                link: `/product/${product.slug}`,
                type: 'product',
                category: {name: product?.product_category?.name, slug: product?.product_category?.slug}
            })
        })
    }

    const pagination = posts?.meta?.pagination?.pageCount > products?.meta?.pagination?.pageCount ? posts?.meta?.pagination : products?.meta?.pagination;

    return {data: newData, pagination};
}

function formatImage(imageSize: ImageSizeType, image: any) {
    let img = {alt: image?.alternativeText ?? '', src: ""}

    if(image?.formats[imageSize]?.url) {
      img = {...img, src: process.env.NEXT_PUBLIC_API_FILE_URL + image?.formats[imageSize]?.url};
    } else {
      img = {...img, src: process.env.NEXT_PUBLIC_API_FILE_URL + image?.formats["thumbnail"].url}
    }

    return img;
  }


function SearchedResults ({query}: {query: string;}) {
    const [pageNumber, setPageNumber] = useState(1);
    const { 
        isPending,
        error,
        data,
        } = useQuery({
        queryKey: ['searchResults', query, pageNumber],
        queryFn: () => getSearchedResults(query, pageNumber),
      });

    if(isPending) return <Logoloader />;

    if(!data?.data) return null;

    return (
        <div>
            {
                data?.data.map(searchedProd => {
                    return (
                        <SearchCard key={searchedProd.title} {...searchedProd} />
                    )
                })
            }

            <Pagination pageNumber={pageNumber} totalPages={data?.pagination?.pageCount} setPageNumber={setPageNumber} />
        </div>
    )
}
