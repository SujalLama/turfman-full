import { ChangeEvent } from "react";

interface IInputProps {
    className?: string;
    type: 'text' | 'number' | 'email' | 'password' | 'search';
    name?: string;
    label?: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void
    error?: string;
    value?: string | number;
    disabled?: boolean;
    placeholder?: string;
    min?: number;
    max?: number;
    required?: boolean;
}

export default function Input({
    className, 
    type,
    name,
    label,
    onChange,
    error,
    value,
    disabled = false,
    placeholder,
    min,
    max,
    required
} : IInputProps) {
  return (
    <>
        {label && <label htmlFor=""></label>}
        <input 
            className={`w-full border-1 text-gray-darker 
            py-[12px] px-[11px] rounded-[5px] focus:border-primary focus:ring-primary 
            placeholder:text-black/30 ${error ? 'border-red' : 'border-gray/20'} ${className ?? ''}`}
            type={type}
            name={name}
            onChange={onChange}
            value={value}
            placeholder={placeholder ?? ''}
            disabled={disabled}
            min={min}
            max={max}
            required={required}
        />
        {error && <span className="block text-red  text-sm mt-2">{error}</span>}
      </>
  )
}
