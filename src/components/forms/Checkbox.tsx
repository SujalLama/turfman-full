interface ICheckboxProps {
    name: string;
    value: string;
    className?: string;
  }
  
  export default function CheckboxButton({name, value, className} : ICheckboxProps) {
    return (
      <>
          <input className={`inline-block text-primary focus:ring-primary ${className ? className : ''}`}
            type="checkbox" name={name} value={value} />
          <span className="capitalize">{value}</span>
      </>
    )
  }
  