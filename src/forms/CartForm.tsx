"use client";

import Select from "@/components/forms/Select"

interface Option {
    value: string;
    name: string;
}

export default function CartForm({options} : {options: Option[]}) {
  return (<>
        <form className="">        
            <div className=" flex mb-4">
                <label className="font-semibold px-4 flex items-center justify-center  bg-black/10 text-gray-darker rounded-l-[5px] shrink-0" htmlFor="kg">Kg</label>
                <Select 
                    options={options}
                    name="quantity"
                    value=""
                    onChange={() => {return ""}}
                    className='!mb-0'
                />
                
            </div>
            <button className="hidden" >Clear</button>

            <div className="flex mb-10 max-w-[300px]">

                <input type="number" className="mr-4 w-[20%]  border-1 border-gray/20 text-gray-darker text-center  rounded-[5px] focus:border-primary focus:ring-primary  placeholder:text-black/30" name="quantity" value="1" title="Qty" />
                
                <button type="submit" className="flex-1 block bg-primary hover:bg-gray-darker text-center py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase w-full transition-colors duration-500 ease-in-out disabled:bg-red disabled:cursor-not-allowed">
                    Add to cart</button>
        
            </div>
        </form>
        <div className="mb-2">
            <span className="font-bold">Total:</span>
            <span>$500</span>
        </div>
    </>
  )
}
