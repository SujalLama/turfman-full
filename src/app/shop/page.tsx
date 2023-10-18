import PageHero from "@/section/PageHero"
import ProductCategoryList from "@/section/ProductCategoryList"
import ProductList from "@/section/ProductList"

const pageHeroData = {
  bgImg: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
      alt: 'page hero'
  },
  title: 'Shop'
}
const sectionHeader = {
  title: "Grass",
  subTitle: "For Sale",
  desc: "Fresh clear, residential turf, commercial turf, urban turf for wholesale and rental ."
}
const sectionHeader2 = {
  title: "Grass",
  subTitle: "Fertilizer",
  desc: "Maintain your turf for there durability."
}
const sectionHeader3 = {
  title: "DIY Packages",
  subTitle: "For Rent",
  desc: "Do it yourself by renting following products."
}

export default function Page() {
  return (
    <main>
      <PageHero data={pageHeroData} />
      <ProductCategoryList {...sectionHeader} />
      <ProductCategoryList {...sectionHeader2} />
      <ProductCategoryList {...sectionHeader3} />
      <ProductList />
    </main>
  )
}
