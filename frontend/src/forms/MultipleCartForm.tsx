"use client";

import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select"
import { CartContext, Types } from "@/providers/CartProvider";
import { ProductOptionType } from "@/section/SingleProductContent";
import { ProductVariantType } from "@/utils/dataFormatter";
import { ChangeEvent, useContext, useEffect, useState } from "react";


export default function MultipleCartForm(
    {
        label, 
        options, 
        productVariants,
        img,
        link,
        name,
    } : 
    {
        label: string; 
        options: ProductOptionType[];
        productVariants : ProductVariantType;
        img: {src: string; alt: string};
        link: string;
        name: string;
    }) {

        
    const {state, dispatch} = useContext(CartContext);

    const [selectedOption, setSelectedOption] = useState(options[0].value);
    const [selectedQuantity, setSelectedQuantity] = useState(1);
    const [error, setError] = useState('');


    const optionChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    }

    const quantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedQuantity(parseInt(e.target.value));
    }

    function isProductAdded () : boolean {
        const addedCart = state.find((cart) => cart?.id == 'variant_' +  productVariants[selectedOption]?.id.toString());

        if(addedCart) {
            return true;
        }

        return false;
    }

    function addToCart () {
        if(selectedQuantity > productVariants[selectedOption]?.stock) {
            setError('Currently, such quantity not available');
            return;
        }

        if(isProductAdded()) {
            return dispatch({type: Types.Update, payload: {id : 'variant_' +  productVariants[selectedOption]?.id.toString(), quantity: selectedQuantity}});
        }

        dispatch({type: Types.Add, payload: {
            id : 'variant_' + productVariants[selectedOption]?.id.toString(), 
            img, 
            price : productVariants[selectedOption]?.price, 
            name : name + ' ' + selectedOption, 
            link, 
            quantity : selectedQuantity}})
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

            {productVariants[selectedOption]?.stock ? <div className="flex mb-10">

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
        
            </div> : <p className="text-red font-bold">Out of Stock</p>}
        </div>

        {
            options.filter(option => option.value === selectedOption)[0]?.description 
                ? <p className="mb-8">{options.filter(option => option.value === selectedOption)[0]?.description}</p>
                : null
        }
        <div></div>

        {error && <p className="mt-4 text-red-400">{error}</p>}

        <div className="mb-2">
            <span className="font-bold mr-2">Total:</span>
            <span>${productVariants[selectedOption]?.price * selectedQuantity}</span>
        </div>
        <div>
        <span className="mr-4">
            <span className="font-semibold mr-2">SKU:</span>
            <span>{productVariants[selectedOption]?.sku}</span>
        </span>
        </div>
    </>
  )
}
