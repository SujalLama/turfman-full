import { shopData } from "@/data/shopData"
import PageHero, { IPageHero } from "@/section/PageHero"
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
