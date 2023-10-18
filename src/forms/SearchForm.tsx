'use client';

import FaIcons from "@/components/FaIcons";
import Input from "@/components/forms/Input";
import { ChangeEvent } from "react";

export default function SearchForm() {
  return (
    <form className="relative flex w-full">
        <Input className="h-[60px] pl-3.5 pr-20 mr-0 bg-white" placeholder="Search ..." onChange={(e: ChangeEvent<HTMLInputElement>) => {}} type="search" name="" error="" value=""/>
        <button type="submit" className="absolute w-[70px] h-[60px] right-0 font-bold">
            
            <FaIcons icon="faSearch" />
        </button>
    </form>
  )
}
