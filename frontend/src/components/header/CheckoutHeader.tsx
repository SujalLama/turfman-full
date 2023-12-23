import Image from "next/image";
import { Link } from 'nextjs13-progress';
import FaIcons from "../FaIcons";

const midHeaderData = {
logo: {
    url: 'https://theturfman.com.au/wp-content/uploads/2020/07/Logo.jpeg', 
    title: 'The Turfman Perth', 
    alt: 'The Turfman Perth'
}
}

export default function CheckoutHeader() {
  return (
    <header className="border-b">
        <div className="mx-auto px-3.5 max-w-full sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px] xl:max-w-[1200px]">
            <div className="flex items-center py-1.5 justify-between">
                <Link href="/" rel="home" className="max-h-25" >
                    <Image 
                    className="max-h-25" 
                    src={midHeaderData.logo.url} 
                    alt={midHeaderData.logo.alt} 
                    title={midHeaderData.logo.title} 
                    width={300}
                    height={100}
                    />
                </Link>

                <Link href="/cart">
                    <FaIcons icon="faCartShopping" className="text-[25px] px-2.5 text-black hover:text-primary"/>
                </Link>
            </div>
        </div>
    </header>
  )
}
