import { IProductCardProps } from "@/components/ProductCard"
import { shopData } from "@/data/shopData"
import PageHero, { IPageHero } from "@/section/PageHero"
import ProductCategoryList, { IProductCtgProps } from "@/section/ProductCategoryList"
import ProductList from "@/section/ProductList"
import ProductsMainContent from "@/section/ProductsMainContent"

export default async function Page() {
  return (
    <main>
      {
        shopData.sections.map(section => {
          if(section.name === "pageHero") {
            return <PageHero key={section.name} data={section.content as IPageHero} />
          }

        })
      }
      <ProductsMainContent />
    </main>
  )
}
