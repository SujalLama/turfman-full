
import { API_URL } from '@/api/constants';
import ProductCard from '@/components/ProductCard';
import { formatCategory, formatProducts } from '@/utils/dataFormatter';

interface ITag {
  id: number;
  name: string;
  slug: string;
}

async function getRelatedProducts(productId: number, tags: ITag[]) {

  if(tags.length === 0) {
    return []
  }

  let tagsUrl = tags.length > 0 ? tags.map((item, i) => (`&filters[$or][${i+1}][product_tags][id][$eq]=${item.id}`)).join('') : "";


  const url = API_URL + `/products?populate[0]=product_category&filters[id][$ne]=${productId}`+
            `&fields[0]=name&fields[1]=slug&populate[1]=product_images&pagination[pageSize]=4`+
            `&populate[2]=product_variants&populate[3]=product_tags&fields[2]=short_desc&fields[3]=unit`+
            tagsUrl;
  
  const {data} = await fetch(url, {next: {revalidate: 3600}}).then(res => res.json());

  if(!data) {
    return []
  };

  return formatProducts(data)
}

export default async function RelatedProducts({data}: {data: { productId: number; tags: ITag[]}}) {
  const products = await getRelatedProducts(data.productId, data.tags);
  
  if(products.length === 0) {
    return null;
  }

  return (
    <section className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <h2 className="font-bold text-gray-darker text-[28px] mb-10">Related Products</h2>
        <div className="md:flex md:flex-wrap md:-mx-2.5">
            {
               products.map((product : any) => {
                return (
                <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
                xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px] flex flex-col" key={product.id}>
                    <ProductCard {...product}/>
                </div>
                )
            })
            }
        </div>
    </section>
  )
}
