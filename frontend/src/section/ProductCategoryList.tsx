import ProductCard, { IProductCardProps } from "@/components/ProductCard"
import SectionHeader from "@/components/SectionHeader";

export interface IProductCtgProps {
  title: string;
  subTitle: string;
  desc: string;
  products: IProductCardProps[]
}

// TODO: add mb-14 in section header;
export default function ProductCategoryList({data}: {data : IProductCtgProps}) {
  const {title, subTitle, desc, products} = data;
  return (
    <section className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <SectionHeader data={{title, subTitle, desc}}/>

        <div className="md:flex md:flex-wrap md:items-start md:-mx-2.5">
          {
            products.map(product => {
              return (
                <div className="mb-5 md:w-[calc(50%_-_20px)] large:w-[calc(33.33%_-_20px)] 
                  xl:w-[calc(25%_-_20px)] md:mx-2.5 border rounded-[5px]" key={product.id}>
                  <ProductCard {...product}/>
                </div>
              )
            })
          }
        </div>
    </section>
  )
}
