import { MONTH_NAMES } from "@/api/constants";
import { IProductCardProps } from "@/components/ProductCard";
import { ISingleProduct } from "@/section/SingleProductContent";

export type ImageSizeType = "small" | "thumbnail" | "large" | "medium";
export enum ImageSizeEnum {
  small = "small",
  thumbnail = "thumbnail",
  large = "large",
  medium = "medium",
}



export const PRODUCT_URL = '/product';

export type  ProductVariantType = {[productOption: string] : {id: number; price: number; stock: number; sku: string;}}

export interface IShippingCost {
  id: number;
  type: string;
  onlyLocally: boolean
  localRate: number | null;
  outsideRate: number | null;
}

function uniqueObjectsByKey(array : any[], key:string) {
  const seen = new Set();
  return array.filter(obj => {
    const value = obj[key];
    if (!seen.has(value)) {
      seen.add(value);
      return true;
    }
    return false;
  });
}

export function formatProducts(products : any[]) {

    if(products.length === 0) {
      return []
    }

    const newProducts = uniqueObjectsByKey(products, 'id').map(product => {
      const {name, short_desc, slug, unit, product_images, product_variants, product_category, popularity} = product.attributes;
      
      let img = {src:"", alt: ""};
      let price: number | [number, number] = 0;
      let option = false;
      let stock = 1;
      let sku = "";
      let productId : number = 0;
      let shippingCost : IShippingCost = {
        id: 0,
        type: "flat",
        onlyLocally: true,
        localRate: null,
        outsideRate: null
      };
      
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
              productId = data[0]?.id
              sku = data[0]?.attributes?.SKU
              
            } else {
              productId = data[0]?.id
              option = true;
              price = findMinMaxInArray(data);
              sku=""
            }
          }
      }

      if(product_category) {
        const {shippingRate} = product_category?.data?.attributes

        if(shippingRate) {
          shippingCost.id = shippingRate.id;
          shippingCost.type = shippingRate.type;
          shippingCost.onlyLocally = shippingRate.onlyLocally;
          shippingCost.localRate = shippingRate.localRate;
          shippingCost.outsideRate = shippingRate.outsideRate;
        }
      }
  
      const formatedData : IProductCardProps = {
        id: productId,
        productId: product.id,
        name, 
        price, 
        desc: short_desc, 
        link: PRODUCT_URL + '/' + slug, 
        stock,
        img,
        option,
        unit,
        category: product_category?.data?.attributes?.name ?? "",
        sku,
        shippingCost,
        popularity
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
    let img = {alt: image?.attributes?.alternativeText ?? '', src: ""}

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
      const {name, short_desc, slug, unit, product_images, product_option, product_variants, product_category, product_tags, popularity, fullDescription} = product?.attributes;

      let images = [{src:"", alt: ""}];
      let price : number | [number, number] = 0;
      let sku : string = '';
      let option = false;
      let category = {id: 0, name: '', slug: ''}
      let stock = 1;
      let tags : {id: number, name: string; slug: string;}[] = [];
      let productOptions = {
        label: '',
        options: []
      };
      let productId : number = 0;

      let productVariants : ProductVariantType= {};
      let shippingCost : IShippingCost = {
        id: 0,
        type: "flat",
        onlyLocally: true,
        localRate: null,
        outsideRate: null
      };
      
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
              productId = data[0]?.id

            } else {

              option = true;
              price = findMinMaxInArray(data)
              sku = "";

              data.forEach((item : any) => {
                if(item?.attributes?.product_option_item?.data) {
                  const optionName = item?.attributes?.product_option_item?.data
                  
                  productVariants[optionName?.attributes?.value] = {
                    id: item.id,
                    price: item?.attributes?.price,
                    stock: item?.attributes?.stock_quantity,
                    sku: item?.attributes?.SKU,
                  }
                }
              })
            }
          }

      }

      if(product_option && product_option.data) {
        const {data} = product_option;

        if(data?.attributes?.product_option_items && data?.attributes?.product_option_items?.data?.length > 0) {
          const productOptionItems = data?.attributes?.product_option_items?.data;

          productOptions.label = data?.attributes?.name ?? '';

          productOptions.options = productOptionItems.map((option: any) => ({
            id: option.id, 
            name: option.attributes.value, 
            value: option.attributes.value, 
            description: option.attributes?.description ?? ''}))
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

      if(product_category) {
        const {shippingRate} = product_category?.data?.attributes

        if(shippingRate) {
          shippingCost.id = shippingRate.id;
          shippingCost.type = shippingRate.type;
          shippingCost.onlyLocally = shippingRate.onlyLocally;
          shippingCost.localRate = shippingRate.localRate;
          shippingCost.outsideRate = shippingRate.outsideRate;
        }
      }
  
      const formattedData : ISingleProduct = {
        productId: product.id,
        id: productId, 
        name, 
        desc: short_desc, 
        price,
        stock,
        unit,
        slug : PRODUCT_URL + '/' + slug,
        images,
        option,
        category,
        sku,
        tags,
        productOptions,
        productVariants,
        fullDescription,
        shippingCost,
        popularity
      }
      
      return formattedData;
    
  }


  export function formatPost(post: any) {
    const {title, slug, body, description, cover, updatedAt, post_category} = post?.attributes

    let coverImg = {src: "", alt: ""};
    let date = '';
    let category = {id: 0, name: "", slug: ""};

    if(cover?.data) {
      coverImg = formatImage(ImageSizeEnum.small, cover?.data);
    }

    if(updatedAt) {

      date = formatDate(updatedAt);
    }

    if(post_category?.data) {
      category.id = post_category?.data?.id;
      category.name = post_category?.data?.attributes?.name;
      category.slug = post_category?.data?.attributes?.slug;
    }

    return {
      id: post.id,
      title,
      slug,
      body,
      description,
      coverImg,
      date,
      category
    }
  }


  export function formatPosts(posts: any[]) {
    
    const newPosts = posts.map(post => {
      return formatPost(post);
    })


    return newPosts;
  }

  
  export function formatDate(date: string) {
    const newDate = new Date(date);

    return `${newDate.getDate()} ${MONTH_NAMES[newDate.getMonth()]}, ${newDate.getFullYear()}`
  }

  export function formatOrderDate(date: Date | null) {
    if(!date) {
        return null;
    }

    return `${date.getFullYear()}-${(date.getMonth()+1).toString().padStart(2, "0")}-${(date.getDate()).toString().padStart(2, "0")}`
}