'use client';

import FaIcons from "@/components/FaIcons";
import Input from "@/components/forms/Input";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useState } from "react";

export default function SearchForm() {
  const [search, setSearch] = useState('');
  const router = useRouter();

  function goToSearch (e: FormEvent) {
    e.preventDefault();
    router.push(`/search?s=${search}`)
  }

  return (
    <form className="relative flex w-full" onSubmit={goToSearch}>
        <Input 
          className="h-[60px] pl-3.5 pr-20 mr-0 bg-white" 
          placeholder="Search ..." 
          onChange={(e: ChangeEvent<HTMLInputElement>) => {setSearch(e.target.value)}} 
          type="search" 
          name="" 
          error="" 
          value={search}
        />
        <button type="submit" className="absolute w-[70px] h-[60px] right-0 font-bold">
            <FaIcons icon="faSearch" />
        </button>
    </form>
  )
}
