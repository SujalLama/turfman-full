import { IProductCardProps } from "@/components/ProductCard"
import { shopData } from "@/data/shopData"
import PageHero, { IPageHero } from "@/section/PageHero"
import ProductCategoryList, { IProductCtgProps } from "@/section/ProductCategoryList"
import ProductList from "@/section/ProductList"

export default function Page() {
  return (
    <main>
      {
        shopData.sections.map(section => {
          if(section.name === "pageHero") {
            return <PageHero key={section.name} data={section.content as IPageHero} />
          }

          if(section.name === "productCategory") {
            return <ProductCategoryList key={section.name} data={section.content as IProductCtgProps} />
          }

          if(section.name === "allProducts") {
            return <ProductList key={section.name} data={section.content as IProductCardProps[]} />
          }

        })
      }
    </main>
  )
}
