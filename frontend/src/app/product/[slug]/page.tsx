import FaIcons from "@/components/FaIcons";
import RelatedProducts from "@/section/RelatedProducts"
import SingleProductContent from "@/section/SingleProductContent"
import { formatProduct } from "@/utils/dataFormatter"
import Link from "next/link";

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
        <main className="bg-gray/20 xl:-mt-7.5">
            <div className="py-40 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
                <div className="flex items-center justify-center flex-col text-center">
                    <h2 className="leading-[1.1] text-primary text-[100px] font-bold">404</h2>
                    <h3 className="font-semibold text-2xl text-gray-darker mb-10">Oops! The page you were looking for, couldn&apos;t be found.</h3>
                    <Link  href="/" className="text-gray-darker hover:text-primary transition-colors duration-500 ease-in-out">
                        <span className="pr-2">Back to home page</span>
                        <FaIcons icon="faArrowRight" />
                    </Link>
                </div>
            </div>
        </main>
    );
  }

  return (
    <main>
      <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <SingleProductContent data={product} />
      </div>
        <RelatedProducts id={product?.category?.id} />
    </main>
  )
}
