import { IProductCardProps } from "@/components/ProductCard";
import { ISingleProduct, ProductOptionType } from "@/section/SingleProductContent";

export type ImageSizeType = "small" | "thumbnail" | "large" | "medium";
export enum ImageSizeEnum {
  small = "small",
  thumbnail = "thumbnail",
  large = "large",
  medium = "medium",
}

export type  ProductVariantType = {[productOption: string] : {id: number; price: number; stock: number; sku: string;}}

export function formatProducts(products : any[]) {

    if(products.length === 0) {
      return []
    }
  
    const newProducts = products.map(product => {
      const {name, short_desc, slug, product_images, product_variants} = product.attributes;
  
      
      let img = {src:"", alt: ""};
      let price: number | [number, number] = 0;
      let option = false;
      let stock = 1;
      
      if(product_images) {
          const {data} = product_images;


          if(data !== null) {
            const images = data.map((item : any) => {
              return formatImage(ImageSizeEnum.medium, item);
            })

            img = images[0]
          }
      
      }

      if(product_variants) {

          const {data} = product_variants;
          
          if(data.length > 0) {

            if(data.length === 1 ) {
              price = data[0]?.attributes?.price
              stock = data[0]?.attributes?.stock_quantity
            } else {
              option = true;
              price = findMinMaxInArray(data)
            }
          }
      }
  
      const formatedData : IProductCardProps = {
        id: product.id.toString(), 
        name, 
        price, 
        desc: short_desc, 
        link: '/shop/'+ slug, 
        stock,
        img,
        option
      }
      
      return formatedData
    })
  
    return newProducts;
  }

  export function findMinMaxInArray(data: any[]) : [number, number] {
    const sortedPrice = data.map(item => item?.attributes?.price).sort((a: number, b: number) => a-b);
    return [sortedPrice[0], sortedPrice[sortedPrice.length - 1]]
  }

  export function formatImage(imageSize: ImageSizeType, image: any) {
    let img = {alt: image?.attibutes?.alternativeText ?? '', src: ""}

    if(image?.attributes?.formats[imageSize]?.url) {
      img = {...img, src: process.env.NEXT_PUBLIC_API_FILE_URL + image?.attributes?.formats[imageSize]?.url};
    } else {
      img = {...img, src: process.env.NEXT_PUBLIC_API_FILE_URL + image?.attributes?.formats["thumbnail"].url}
    }

    return img;
  }
  
 export function formatCategories(categories : any[]) {
    const newCategories = categories.map(category => {
      const newProducts = formatProducts(category.attributes.products.data);
      
      const products : any[] = [];
      return {
        id: category.id,
        name: category.attributes.name,
        slug: category.attributes.slug,
        products : newProducts
      }
    })
  
    return newCategories;
  }


  export function formatCategory(category: any) {
    
    return {
      id: category.id,
      name: category.attributes.name,
      slug: category.attributes.slug,
      products: formatProducts(category.attributes.products.data),
    }
  }

  export function formatProduct(product: any) {
      const {name, short_desc, slug, product_images, product_variants, product_category, product_tags} = product.attributes;
  
      
      let images = [{src:"", alt: ""}];
      let price : number | [number, number] = 0;
      let sku : string | string[] = '';
      let option = false;
      let category = {id: 0, name: '', slug: ''}
      let stock = 1;
      let tags : {id: number, name: string; slug: string;}[] = [];
      let productOptions = {
        label: '',
        options: []
      };
      let productVariants : ProductVariantType= {};
      
      if(product_images) {

          const {data} = product_images;


          if(data !== null) {
            const createdImages = data.map((item : any) => {
              return formatImage(ImageSizeEnum.small, item);
            })

            images = createdImages;
          }
      
      }

      if(product_variants) {
          const {data} = product_variants; 

          if(data.length > 0) {

            if(data.length === 1 ) {
              price = data[0]?.attributes?.price
              stock = data[0]?.attributes?.stock_quantity
              sku = data[0]?.attributes?.SKU
            } else {
              option = true;
              price = findMinMaxInArray(data)
              sku = data.map((item : any) => item?.attributes?.SKU);

              
              productOptions.options = data.map((item: any) => {
                const {product_option} = item?.attributes
                productOptions.label = product_option.name
                return {...product_option, name: product_option.value, value: product_option.value}
              });

              

              data.forEach((item : any) => {
                productVariants[item?.attributes?.product_option?.value] = {
                  id: item.id,
                  price: item?.attributes?.price,
                  stock: item?.attributes?.stock_quantity,
                  sku: item?.attributes?.SKU,
                }
              })
            }
          }

      }

      if(product_category) {
        const {data} = product_category;
        category = {
            id: data.id,
            name: data.attributes.name,
            slug: data?.attributes?.slug ?? '',
        }
      }

      if(product_tags) {
        const {data} = product_tags;

        if(data.length > 0) {
          tags = data.map((item: any) => ({id: item.id, name: item.attributes.name, slug: item.attributes.slug}))
        }
        
      }
  
      const formattedData : ISingleProduct = {
        id: product.id, 
        name, 
        desc: short_desc, 
        price,
        stock,
        slug : '/shop/' + slug,
        images,
        option,
        category,
        sku,
        tags,
        productOptions,
        productVariants
      }
      
      return formattedData;
    
  }