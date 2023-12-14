

import { ChangeEvent } from "react";

interface ISelectProps {
    name?: string;
    options?: {value: string; name: string;}[];
    className?: string;
    onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
    defaultValue?: string;
    value: string;
    error?: string;
    disabled?:boolean;
}
export default function Select({name, options, className, onChange, value, defaultValue, error, disabled}: ISelectProps) {
    
    if(!options) {
        return;
    }

  return (
    <>
    <select 
        className={`border-1 border-gray/20 text-gray-darker rounded-[5px] w-full py-[12px] px-[11px] mb-5 focus:border-primary focus:ring-primary 
            placeholder:text-black/30 ${className ? className : ""}`} 
        name={name} 
        onChange={onChange}
        value={value} 
        defaultValue={defaultValue}
        disabled={disabled}
        >
            {
                options.map(option => {
                    return <option key={option.value} value={option.value}>{option.name}</option>;
                })
            }
    </select>
    {error && <span className="block text-red  text-sm mt-2">{error}</span>}
    </>
  )
}
