import { ChangeEvent } from "react";

interface IRadioButtonProps {
  name: string;
  value: string;
  className?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  showLabel?: boolean;
  disabled?:boolean;
}

export default function RadioButton({name, value, className, onChange, checked, showLabel = true, disabled} : IRadioButtonProps) {
  return (
    <>
        <input 
          onChange={onChange} 
          className={`inline-block text-primary focus:ring-primary ${className ? className : ''}`}
          type="radio" 
          name={name} 
          value={value}
          checked={checked}
          disabled={disabled}
          />
        {showLabel && <span className="capitalize">{value}</span>}
    </>
  )
}
