import CartTable from "@/components/CartTable";
import CartTotalForm from "@/forms/CartTotalForm";
import Hero from "@/section/Hero";
import PageHero from "@/section/PageHero";
import RelatedProducts from "@/section/RelatedProducts";

const pageHeroData = {
  bgImg: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
      alt: 'page hero'
  },
  title: 'Cart'
}

const cartData = [
  {
    id: "ndi0348",
    link: "https://theturfman.com.au/product/kikuyu/",
    img: {src: "https://theturfman.com.au/wp-content/uploads/2020/06/Kikiyu-300x300.jpeg", alt: "buy-Kikuyu-turf"},
    name: "Kikuyu",
    quantity: 1,
    price: 10,
  },
  {
    id: "ndje920",
    link: "https://theturfman.com.au/product/kikuyu/",
    img: {src: "https://theturfman.com.au/wp-content/uploads/2020/06/Kikiyu-300x300.jpeg", alt: "buy-Kikuyu-turf"},
    name: "Kimiu",
    quantity: 3,
    price: 10,
  },
]

export default function page() {
  return (
    <div>
      <PageHero data={pageHeroData}/>

      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <h2 className="font-bold text-gray-darker text-[28px] mb-6">Cart Items</h2>
          <div className="overflow-x-scroll">
              <CartTable data={cartData} />
          </div>
      </div>
          
          {cartData.length !== 0 && (
            <>
              <CartTotalForm />
              <RelatedProducts />
            </>
            )
          }
    
    </div>
  )
}
