interface ITextareaProps {
    className?: string;
    placeholder?: string;
    name?: string;
}

export default function Textarea({className, placeholder, name} : ITextareaProps) {
  return (
    <textarea 
        className={`w-full border-1 border-gray/20 text-gray-darker py-[15px] 
        px-[20px] rounded-[5px] focus:border-primary focus:ring-primary mb-5 
        placeholder:text-black/30 ${className ? className : ''}`} 
        placeholder={placeholder} 
        name={name}></textarea>
  )
}
