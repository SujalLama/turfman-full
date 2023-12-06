import { API_URL, FILE_URL, SITE_URL } from "@/api/constants";
import ErrorComponent from "@/components/ErrorComponent";
import RelatedProducts from "@/section/RelatedProducts"
import SingleProductContent from "@/section/SingleProductContent"
import { formatProduct } from "@/utils/dataFormatter"
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata(
  { params}: {params: {slug: string;}},
  parent: ResolvingMetadata
): Promise<Metadata> {
  // read route params
  const slug = params.slug
 
  const url = API_URL + `/products?filters[slug][$eq]=${slug}&populate=*`
  // fetch data
  const {data} = await fetch(url).then((res) => res.json());

  if(!data) {
    return {
      title: 'Shop - The Turfman Perth',
      description: 'Eco-wet is a fast-acting product that improves soil structure and increases beneficial microbial activity to keep waxy sands, heavy clays, and other generally water-repellent soils wet for longer. Itt is different from other wetters since it contains natural polymers that strengthen the soil structure without harming it. The natural polymer that has been introduced functions as a sponge, generating a long-term solution.',
      publisher: "https://facebook.com/theTurfmanPerth",
      openGraph: {
          images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"],
          type: "article",
          url: `${SITE_URL}/shop`,
          title: "Shop",
          locale: "en_US",
          siteName: "The Turfman Perth",
      },
      twitter: {
          images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"]
      }
    }
  }

  
  const {product_images, defaultSeo, name, short_desc} = data[0].attributes
 
  const image = product_images.data[0] ?  `${FILE_URL + product_images.data[0].attributes.url}` : "https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png";
  const newTitle = defaultSeo?.metaTitle ?? name;
  const newDesc = defaultSeo?.metaDescription ?? short_desc;

  return {
    title: newTitle,
    description: newDesc,
    openGraph: {
      images: [image],
    },
  }
}

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
                   "&populate[7]=product_option.product_option_items"+
                   "&populate[8]=product_category.deliveryOptions";
   
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
        <RelatedProducts data={{tags: product.tags, productId: product.generalId}} />
    </main>
  )
}
