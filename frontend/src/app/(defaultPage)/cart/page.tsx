import ShoppingCart from "@/components/ShoppingCart";
import PageHero from "@/section/PageHero";

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
      <ShoppingCart />
    </div>
  )
}
