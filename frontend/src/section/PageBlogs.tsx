"use client";

import BlogCardItem, { IBlogCardItem } from '@/components/BlogCardItem'
import Pagination from '@/components/Pagination'
import QueryProvider from '@/providers/QueryProvider';
import { formatPosts } from '@/utils/dataFormatter';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useState } from 'react';

export default function PageBlogs () {
  return <QueryProvider>
    <PageMainContent />
  </QueryProvider>
}

async function fetchPosts(page: number) {
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/posts?populate[1]=cover&populate[2]=post_category&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;
  
  const {data:{data, meta}} = await axios.get(url)
  return {data: formatPosts(data), pagination: meta?.pagination};
}

const pageSize = 4;

function PageMainContent() {
  const[page, setPage] = useState<number>(1);

  const { 
    isPending,
    error,
    data,
    } = useQuery({
    queryKey: ['posts', page],
    queryFn: () => fetchPosts(page),
  })

  



  if (error) return (
      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] 
        large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
      {'An error has occurred: ' + error.message}
      </div>
    )


  return (
    <div className="mb-20 md:-mx-4 large:w-[67%] large:px-3.5">
        <div className="md:flex md:items-start md:flex-wrap ">
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
          (data?.data && data?.data?.length > 0) && data?.data?.map(blog => {
                return <BlogCardItem key={blog.id} data={blog} />
            })
        }
        </div>
    
        <Pagination pageNumber={page} setPageNumber={setPage} totalPages={data?.pagination?.pageCount} />
    </div>
  )
}
