import { MouseEventHandler } from "react";

interface IButtonProps {
    type?: 'button' | 'submit';
    onClick?: MouseEventHandler<HTMLButtonElement>;
    name: string;
    className?: string;
    variant?: 'primary' | 'secondary';
    disabled?: boolean;
}

export default function Button({type = 'button', onClick, name, className, variant = 'primary', disabled} : IButtonProps) {
  const bgColor = variant == 'primary' ? 'bg-primary hover:bg-gray-darker' : 'bg-gray-darker hover:bg-primary';

  return (
    <button 
        className={`py-4 px-7.5 text-sm rounded-[5px] text-white
         tracking-[1px] font-bold uppercase w-full cursor-pointer 
         transition-colors duration-500 ease-in-out ${bgColor} ${className ? className : ''}`}
        type={type}
        onClick={onClick}
        disabled={disabled}
        >
            {name}
    </button>
  )
}
