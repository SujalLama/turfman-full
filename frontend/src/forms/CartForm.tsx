"use client";

import { API_URL } from "@/api/constants";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import { CartContext, Types } from "@/providers/CartProvider";
import { ShippingContext, ShippingTypes } from "@/providers/ShippingProvider";
import { IShippingCost } from "@/utils/dataFormatter";
import axios from "axios";
import { ChangeEvent, useContext, useState } from "react";


interface ICartForm {
    stock: number;
    id: number;
    price: number;
    link: string;
    img: {src: string; alt: string};
    name: string;
    shippingCost: IShippingCost;
    popularity: number;
    productId: number;
}

export default function CartForm(
    {stock, price, id, link, img, name, shippingCost, popularity, productId}: ICartForm
    ) {
    const {state, dispatch} = useContext(CartContext);
    const {dispatch:shippingDispatch} = useContext(ShippingContext);
    const [selectedQuantity, setSelectedQuantity] = useState(state.filter(item => item.id === id)[0]?.quantity ?? 1);
    const [error, setError] = useState('');

    const quantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('');

        if(parseInt(e.target.value) <= stock) {
            setSelectedQuantity(parseInt(e.target.value));
        }
    }

    function isProductAdded () : boolean {
        const addedCart = state.find((cart) => cart?.id == id);

        if(addedCart) {
            return true;
        }

        return false;
    }

    async function addToCart () {
        if(selectedQuantity > stock) {
            setError('Currently, such quantity not available');
            return;
        }

        if(isProductAdded()) {
            return dispatch({type: Types.Update, payload: {id, quantity: selectedQuantity}});
        }

        const url = API_URL + `/products/${productId}`
        await axios.put(url, {data: {popularity: popularity + 1}});
        shippingDispatch({type: ShippingTypes.Add, payload: shippingCost})
        dispatch({type: Types.Add, payload: {id, img, price, name, link, quantity : selectedQuantity, shippingId: shippingCost.id}})
    }

    if(!stock) {
        return <div className="text-red mb-10">
            <span className="font-bold">Out of Order</span>
            </div>
    }

  return (<>
        
            <div className="flex mb-6">
                <Input 
                    type="number" 
                    className="mr-4 flex-1" 
                    name="quantity" 
                    value={selectedQuantity}
                    min={1}
                    max={stock ?? 0}
                    onChange={quantityChangeHandler}
                />
                
                <Button 
                    className="flex-1"
                    name={
                        (stock !== 0 || stock == null)
                        ? isProductAdded() ? "Update Cart" : "Add to Cart" 
                        : 'Out of Stock'} 
                    onClick={addToCart} 
                    disabled={stock == 0 || stock == null} 
                />
            </div>
                {error && <p className="mt-4 text-red-400">{error}</p>}
        
        <div className="mb-4 ">
            <span className="font-bold mr-2">Total: </span>
            <span className="font-semibold">$</span>
            <span className="text-3xl font-semibold ">{price * selectedQuantity}</span>
        </div>
    </>
  )
}
