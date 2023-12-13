import Loader from '@/components/Loader'
import Image from 'next/image'
import React from 'react'

const midHeaderData = {
    logo: {
      url: 'https://theturfman.com.au/wp-content/uploads/2020/07/Logo.jpeg', 
      title: 'The Turfman Perth', 
      alt: 'The Turfman Perth'
    },
}
export default function loading() {
  return (
    <div className='w-screen h-screen flex items-center justify-center flex-col'>
        <Image 
            className="max-h-25 mb-4" 
            src={midHeaderData.logo.url} 
            alt={midHeaderData.logo.alt} 
            title={midHeaderData.logo.title} 
            width={300}
            height={100}
        />
        <Loader />
    </div>
  )
}
