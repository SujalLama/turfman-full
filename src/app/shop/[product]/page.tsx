import { IProductCardProps } from "@/components/ProductCard"
import { singleProductData } from "@/data/singleProductData"
import ProductTabs, { ITab } from "@/section/ProductTabs"
import RelatedProducts from "@/section/RelatedProducts"
import SingleProductContent, { ISingleProduct } from "@/section/SingleProductContent"


export default function page() {
  return (
    <main>
        <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          {
            singleProductData.sections.map(section => {
              if(section.name === "productInfo") {
                return <SingleProductContent key={section.name} data={section.content as ISingleProduct} />;
              }

              if(section.name === "productDetails") {
                return <ProductTabs key={section.name} tabs={section.content as ITab[]} />;
              }
            })
          }
        </div>

        {
          singleProductData.sections.map(section => {
            if(section.name === "relatedProducts") {
              return <RelatedProducts key={section.name} data={section.content as IProductCardProps[]} />
            }
          })
        }
    </main>
  )
}
