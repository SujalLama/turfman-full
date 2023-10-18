import { MouseEventHandler } from "react";

interface IButtonProps {
    type?: 'button' | 'submit';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    name: string;
    className?: string;
}

export default function Button({type = 'button', onClick, name, className} : IButtonProps) {
  return (
    <button 
        className={`bg-gray-darker py-4 px-7.5 text-sm rounded-[5px] text-white
         tracking-[1px] font-bold uppercase w-full md:w-auto cursor-pointer hover:bg-primary 
         transition-colors duration-500 ease-in-out ${className ? className : ''}`}
        type={type}
        onClick={onClick}
        >
            {name}
    </button>
  )
}
