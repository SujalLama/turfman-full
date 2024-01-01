"use client";

import { API_URL } from "@/api/constants";
import AfterPayMessaging from "@/components/AfterPayMessaging";
import ZipPayMessaging from "@/components/ZipPayMessaging";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select"
import { CartContext, Types } from "@/providers/CartProvider";
import { ShippingContext, ShippingTypes } from "@/providers/ShippingProvider";
import { ProductOptionType } from "@/section/SingleProductContent";
import { IShippingCost, ProductVariantType } from "@/utils/dataFormatter";
import axios from "axios";
import { ChangeEvent, useContext, useState } from "react";


export default function MultipleCartForm(
    {
        label, 
        options, 
        productVariants,
        img,
        link,
        name,
        shippingCost,
        popularity,
        productId,
        category
    } : 
    {
        label: string; 
        options: ProductOptionType[];
        productVariants : ProductVariantType;
        img: {src: string; alt: string};
        link: string;
        name: string;
        shippingCost: IShippingCost,
        popularity: number,
        productId: number,
        category: string;
    }) {

        
    const {state, dispatch} = useContext(CartContext);
    const {state:shipping, dispatch:shippingDispatch} = useContext(ShippingContext);

    const [selectedOption, setSelectedOption] = useState(options[0]?.value);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [error, setError] = useState('');


    const optionChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    }

    const quantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedQuantity(parseInt(e.target.value));
    }

    function isProductAdded () : boolean {
        const addedCart = state.find((cart) => cart?.id ==  productVariants[selectedOption]?.id);

        if(addedCart) {
            return true;
        }

        return false;
    }

    async function addToCart () {
        if(selectedQuantity > productVariants[selectedOption]?.stock) {
            setError('Currently, such quantity not available');
            return;
        }

        if(isProductAdded()) {
            return dispatch({type: Types.Update, payload: {id :  productVariants[selectedOption]?.id, quantity: selectedQuantity}});
        }

        
        // only add shipping info to local storage once 
        if(!shipping.some(item => (item.id === shippingCost.id))) {
            const url = API_URL + `/products/${productId}`
            await axios.put(url, {data: {popularity: popularity + 1}});

            shippingDispatch({type: ShippingTypes.Add, payload: shippingCost})
        }

        dispatch({type: Types.Add, payload: {
            id : productVariants[selectedOption]?.id, 
            img, 
            price : productVariants[selectedOption]?.price, 
            name : name + ' ' + selectedOption, 
            link, 
            quantity : selectedQuantity,
            shippingId: shippingCost.id,
            category,
            sku : productVariants[selectedOption]?.sku, 
        }})
    }


  return (<>
        <div className="">        
            <div className=" flex mb-4">
                <label className="font-semibold px-4 flex items-center justify-center  bg-black/10 text-gray-darker rounded-l-[5px] shrink-0" htmlFor="kg">
                    {label}
                </label>
                <Select 
                    options={options}
                    name={label}
                    value={selectedOption}
                    onChange={optionChangeHandler}
                    className='!mb-0'
                />
                
            </div>
            <button className="hidden" >Clear</button>

            {productVariants[selectedOption]?.stock ? <div className="flex mb-6">

                <Input 
                    type="number" 
                    className="mr-4 flex-1" 
                    name="quantity" 
                    value={selectedQuantity}
                    min={1}
                    max={productVariants[selectedOption]?.stock}
                    onChange={quantityChangeHandler}
                />
                
                
                
                <Button 
                    className="flex-1"
                    name={
                            isProductAdded() ? "Update Cart" : "Add to Cart" 
                        } 
                    onClick={addToCart} 
                />
        
            </div> : <p className="text-red font-bold mb-8">Out of Stock</p>
            }
        </div>

        {
            options.filter(option => option.value === selectedOption)[0]?.description 
                ? <p className="mb-8">{options.filter(option => option.value === selectedOption)[0]?.description}</p>
                : null
        }
        

        {error && <p className="mt-4 text-red-400">{error}</p>}

        {
            productVariants[selectedOption]?.price ?
            (<div className="mb-4">
                <span className="font-bold mr-2">Total:</span>
                <span className="font-semibold">$</span>
                <span className="text-3xl font-semibold ">{productVariants[selectedOption]?.price * selectedQuantity}</span>
            </div>)
            : null
        }
        <div>
            <span className="mr-4">
                <span className="font-semibold mr-2">SKU:</span>
                <span>{productVariants[selectedOption]?.sku}</span>
            </span>
        </div>

        <AfterPayMessaging price={productVariants[selectedOption]?.price} sku={productVariants[selectedOption]?.sku} category={category} />
        <ZipPayMessaging amount={productVariants[selectedOption]?.price} />
    </>
  )
}
