import { ChangeEvent } from "react";

interface IFileProps {
    name?: string;
    className?: string;
    value?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void 
}

export default function FileInput({name, className, value, onChange} : IFileProps) {
  return (
    <input 
    className={`md:mx-3.5 block w-full text-sm text-slate-500
                file:py-[15px] file:px-[20px] file:rounded-[5px]
            file:border-0.5 file:border-dashed file:bg-transparent file:text-sm file:font-semibold
            file:border-primary/80 file:text-black file:w-full
                    hover:file:primary/80 file:flex file:flex-col file:mb-2 ${className ? className : ''}`} 
    accept=".jpeg,.png,.jpg,.webp" 
    type="file"
    value={value}
    onChange={onChange}
    name={name} 
    />
  )
}
