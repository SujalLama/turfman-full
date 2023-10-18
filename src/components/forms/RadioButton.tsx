interface IRadioButtonProps {
  name: string;
  value: string;
  className?: string;
}

export default function RadioButton({name, value, className} : IRadioButtonProps) {
  return (
    <>
        <input className={`inline-block text-primary focus:ring-primary ${className ? className : ''}`}
          type="radio" name={name} value={value} />
        <span className="capitalize">{value}</span>
    </>
  )
}
