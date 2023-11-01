import { IProductCardProps } from "@/components/ProductCard"
import { singleProductData } from "@/data/singleProductData"
import ProductTabs, { ITab } from "@/section/ProductTabs"
import RelatedProducts from "@/section/RelatedProducts"
import SingleProductContent, { ISingleProduct } from "@/section/SingleProductContent"
import { formatProduct } from "@/utils/dataFormatter"

export async function generateStaticParams() {
  const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/products?fields[0]=slug'
  const {data} = await fetch(url, { cache: 'no-store' }).then((res) => res.json());
 
  return data.map((item : {attributes: {slug: string;}}) => ({
    slug: item.attributes.slug,
  }))
}

async function getProductData (slug: string) {
 const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/products?filters[slug][$eq]=${slug}&populate[0]=product_variants&populate[1]=product_variants.product_option&populate[2]=product_images&populate[3]=product_category&populate[4]=product_tags`
 const {data} = await fetch(url, {cache: 'no-store'}).then((res) => res.json());

  if(!data) {
    return null;
  }

  return formatProduct(data[0]);
}

export default async function page({params}: {params: {slug: string;}}) {
  const product = await getProductData(params.slug);
  

  if(!product) {
    return null;
  }

  return (
    <main>
      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <SingleProductContent data={product} />
      </div>
        {/* <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
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
        </div> */}

        {/* {
          singleProductData.sections.map(section => {
            if(section.name === "relatedProducts") {
              return <RelatedProducts key={section.name} data={section.content as IProductCardProps[]} />
            }
          })
        } */}
        <RelatedProducts id={product?.category?.id} />
    </main>
  )
}
