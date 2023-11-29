"use client";

import { useContext, useEffect, useState } from "react";
import FaIcons from "./FaIcons";
import NavLink from "./NavLink";
import { CartContext } from "@/providers/CartProvider";
import { getCartTotal } from "@/utils/cartTotal";

export default function CartButton() {
    const [total, setTotal] = useState(0);
    const {state} = useContext(CartContext);

    useEffect(() => {
      setTotal(getCartTotal(state));
    }, [state])
    
  return (
    <NavLink 
        path="/cart" 
        name={`$${total.toFixed(2)}`}
        iconLink={true} 
        activeClass="bg-gray-darker"
        iconOptions={{icon: <FaIcons icon="faCartShopping" className="text-[25px] px-2.5"/>, showLeft: true}}
        className="flex items-center border-r border-white/20 h-full hover:bg-gray-darker transition-all ease-in-out duration-500 pr-5"
    />
  )
}
