"use client";

import { IProductCardProps } from "@/components/ProductCard";
import ProductCategoryList, { IProductCtgProps } from "./ProductCategoryList";
import useProducts from "@/hooks/useProducts";
import ProductList from "./ProductList";
import QueryProvider from "@/providers/QueryProvider";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function ProductsMainContent() {
    // const [products, categories, loading, error] = useProducts();

    // if(loading) {
    //     return <div>Loading...</div>
    // }
    
  return (
    <QueryProvider>
        {/* <Products /> */}
    {/* {error && <div>Error</div>}
    {
        (categories as any[]).map((category) => {
            const prop : IProductCtgProps = {
                title: category.name,
                subTitle: 'Do Something crazy',
                desc: 'Dom Smeting cray',
                products: category.products,
            }
            return <ProductCategoryList key={category.id} data={prop} />
        })
    }

    <ProductList data={products as IProductCardProps[]} /> */}
    <ProductList />
    </QueryProvider>
  )
}

function Products () {
    const { isPending, error, data } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
        const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?populate[0]=product_variants&populate[1]=product_images`;
        const {data:{data}} = await axios.get(url)
        return data;
        }
      })
    
      if (isPending) return 'Loading...'
    
      if (error) return 'An error has occurred: ' + error.message


      console.log(data);
    return <div>products</div>
}

export default ProductsMainContent