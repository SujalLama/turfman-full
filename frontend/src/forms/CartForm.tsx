"use client";

import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import Select from "@/components/forms/Select"
import { ChangeEvent, useState } from "react";

interface Option {
    value: string;
    name: string;
}

export default function CartForm({options} : {options: Option[]}) {
    const [selectedOption, setSelectedOption] = useState('');
    const [selectedQuantity, setSelectedQuantity] = useState(1);

    const optionChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedOption(e.target.value);
    }

    const quantityChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSelectedQuantity(parseInt(e.target.value));
    }

    

  return (<>
        <form className="">        
            <div className=" flex mb-4">
                <label className="font-semibold px-4 flex items-center justify-center  bg-black/10 text-gray-darker rounded-l-[5px] shrink-0" htmlFor="kg">Kg</label>
                <Select 
                    options={options}
                    name="quantity"
                    value={selectedOption}
                    onChange={optionChangeHandler}
                    className='!mb-0'
                />
                
            </div>
            <button className="hidden" >Clear</button>

            <div className="flex mb-10">

                <Input 
                    type="number" 
                    className="mr-4 flex-1" 
                    name="quantity" 
                    value={selectedQuantity}
                    min={1}
                    max={50}
                    onChange={quantityChangeHandler}
                />
                
                
                <Button 
                    className="flex-1"
                    name="Add to cart" 
                />
        
            </div>
        </form>
        <div className="mb-2">
            <span className="font-bold mr-2">Total:</span>
            <span>$500</span>
        </div>
    </>
  )
}
