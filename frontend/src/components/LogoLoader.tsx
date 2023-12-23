import Image from "next/image"
import Loader from "./Loader"

const midHeaderData = {
    logo: {
      url: 'https://theturfman.com.au/wp-content/uploads/2020/07/Logo.jpeg', 
      title: 'The Turfman Perth', 
      alt: 'The Turfman Perth'
    },
}

export default function Logoloader() {
  return (
    <div className='w-screen h-[50vh] flex items-center justify-center flex-col'>
        <Image 
            className="max-h-25 animate-pulse " 
            src={midHeaderData.logo.url} 
            alt={midHeaderData.logo.alt} 
            title={midHeaderData.logo.title} 
            width={300}
            height={100}
        />
        <Loader className="w-4 h-4" />
    </div>
  )
}
