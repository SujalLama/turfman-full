import { ChangeEvent } from "react";

interface ISelectProps {
    name: string;
    options: {value: string; name: string;}[];
    className?: string;
    onChange: (e: ChangeEvent<HTMLSelectElement>) => {};
    defaultValue?: string;
    value: string;
}
export default function Select({name, options, className, onChange, value, defaultValue}: ISelectProps) {
  return (
    <select 
        className={`border-1 border-gray/20 text-gray-darker rounded-[5px] w-full px-[20px] 
            py-[15px] mb-5 focus:border-primary focus:ring-primary 
            placeholder:text-black/30 ${className ?? className}`} 
        name={name} 
        onChange={onChange}
        value={value} 
        defaultValue={defaultValue}>
            {
                options.map(option => {
                    return <option value={option.value}>{option.name}</option>;
                })
            }
    </select>
  )
}
