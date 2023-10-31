interface ICheckboxProps {
    name: string;
    value: string;
    className?: string;
    label?: string;
  }
  
  export default function CheckboxButton({name, value, className, label} : ICheckboxProps) {
    return (
      <>
          <input className={`inline-block text-primary focus:ring-primary ${className ? className : ''}`}
            type="checkbox" name={name} value={value} />
          {label ? <span>{label}</span> : <span className="capitalize">{value}</span>}
      </>
    )
  }
  