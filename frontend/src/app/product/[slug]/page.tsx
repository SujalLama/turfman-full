import ErrorComponent from "@/components/ErrorComponent";
import RelatedProducts from "@/section/RelatedProducts"
import SingleProductContent from "@/section/SingleProductContent"
import { formatProduct } from "@/utils/dataFormatter"

export async function generateStaticParams() {
  try {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/products?fields[0]=slug'
    const {data} = await fetch(url, { cache: 'no-store' }).then((res) => res.json());
  
    if(!data) {
      return [{slug: '0'}]
    }
   
    return data?.map((item : {attributes: {slug: string;}}) => ({
      slug: item?.attributes?.slug,
    })) 

  } catch(error) {
    return [{slug: '0'}]
  }

}

async function getProductData (slug: string) {
  try {
    const query = `?filters[slug][$eq]=${slug}`+
                   '&populate[0]=product_variants'+
                   '&populate[1]=product_variants.product_option_item'+
                   '&populate[2]=product_images'+
                   "&populate[3]=product_category"+
                   "&populate[4]=product_tags"+
                   "&populate[5]=fullDescription"+
                   "&populate[6]=product_option"+
                   "&populate[7]=product_option.product_option_items";
   
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/products${query}`
    const {data} = await fetch(url, {cache: 'no-store'}).then((res) => res.json());
   
     if(!data) {
      return null;
     }
   
     return formatProduct(data[0]);
  } catch(error) {
    return null;
  }
}

export default async function page({params}: {params: {slug: string;}}) {
  const product = await getProductData(params.slug);
  

  if(!product) {
    return (
        <ErrorComponent />
    );
  }

  return (
    <main>
      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <SingleProductContent data={product} />
      </div>
        <RelatedProducts data={{categoryId: product.category.id, productId: product.generalId}} />
    </main>
  )
}
