"use client";

import ProductList from "./ProductList";
import QueryProvider from "@/providers/QueryProvider";


function ProductsMainContent() {
    // const [products, categories, loading, error] = useProducts();

    // if(loading) {
    //     return <div>Loading...</div>
    // }
    
  return (
    <>
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
    {/* <ProductCategories /> */}
        <ProductList />
    </QueryProvider>
    </>
  )
}

export default ProductsMainContent