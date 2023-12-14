"use client";

import { ChangeEvent, useEffect, useState } from "react";

interface ICheckboxProps {
    name: string;
    value: string;
    className?: string;
    label?: string;
    onChange?: (checked:boolean, value: string) => void;
    disabled?: boolean
  }
  
  export default function CheckboxButton({name, value, className, label, onChange, disabled} : ICheckboxProps) {
    const [checked, setChecked] = useState(false);

    function changeHandler() {
      setChecked((prev) => {
        if(onChange) {
        
          onChange(!prev, value);
        }
  
        return !prev
      });


    }

    

    return (
      <>
          <input className={`inline-block text-primary focus:ring-primary ${className ? className : ''}`}
            type="checkbox" name={name} checked={checked} onChange={changeHandler} disabled={disabled} />
          {label ? <span>{label}</span> : <span className="capitalize">{value}</span>}
      </>
    )
  }
  