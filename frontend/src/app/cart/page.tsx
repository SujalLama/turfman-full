import CartTable from "@/components/CartTable";
import CartTotalForm from "@/forms/CartTotalForm";
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

const relatedProducts = [
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

export default function page() {
  return (
    <div>
      <PageHero data={pageHeroData}/>

      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <h2 className="font-bold text-gray-darker text-[28px] mb-6">Cart Items</h2>
          <div className="overflow-x-scroll">
              <CartTable />
          </div>
      </div>
          
          {cartData.length !== 0 && (
            <>
              <CartTotalForm />
              <RelatedProducts id={3} />
            </>
            )
          }
    
    </div>
  )
}
