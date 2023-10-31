'use client'

import axios from "axios";
import { useLayoutEffect, useState } from "react";

export default function useProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useLayoutEffect(() => {
    setLoading(true);
    setError('');
    getProducts()
    getCategories();
    setLoading(false);
  }, [])
  
  async function getProducts() {
    try{
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/products?populate[0]=product_variants&populate[1]=product_images`;
      const {data:{data}} = await axios.get(url)
    
      if (!data && data.length === 0) {
        // This will activate the closest `error.js` Error Boundary
        setError('Data not found!');
        throw new Error('Failed to fetch data')
      }
    
      
      setProducts(formatProduct(data))
      

    } catch(error) {
      setError('Server error');
      setLoading(false);
    }
    
  }

  async function getCategories() {
    try {
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/product-categories?populate[products][populate]=*`;
      const {data: {data}} = await axios.get(url)
    
      if (!data && data.length === 0) {
        setError('Data not found!');
        throw new Error('Failed to fetch data')
      }
      
        setCategories(formatCategories(data))
      
    } catch (error) {
      setError('Server error');
      setLoading(false);
    }
    
  }

  return [products, categories, loading, error]
}

function formatProduct(products : any[]) {

  if(products.length === 0) {
    return []
  }

  const newProducts = products.map(product => {
    const {name, short_desc, price, stock_quantity, slug, product_images, product_variants} = product.attributes;

    
    let img = {src:"", alt: ""};
    let newPrice = price;
    let option = false;
    
    const {data} = product_images;
    if(data !== null) {
      img = data.map((item : any) => ({alt: item.attributes.alternativeText, src: process.env.NEXT_PUBLIC_API_FILE_URL + item.attributes.formats.medium.url}))[0];
    }


    if(product_variants.data.length > 0) {
      option = true;
      const priceRange = product_variants.data[0].attributes.adjusted_price;
      newPrice = priceRange;
    }
    
    return {
      id: product.id.toString(), 
      name, 
      price: newPrice, 
      desc: short_desc, 
      link: '/shop/'+slug, 
      stock: stock_quantity,
      img,
      option
    }
  })

  return newProducts;
}

function formatCategories(categories : any[]) {
  const newCategories = categories.map(category => {
    const newProducts = formatProduct(category.attributes.products.data);
    // console.log( category.attributes.products.data);
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