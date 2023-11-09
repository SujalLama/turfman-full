
interface IWysiwyg {
    content: string;
    className?: string;
}

export default function Wysiwyg({content, className}: IWysiwyg) {
  return (
    <div className={`prose  prose-a:no-underline prose-a:font-normal hover:prose-a:text-primary ${!className ? "prose-ul:marker:primary marker:text-primary marker:text-lg" : className}`}
        dangerouslySetInnerHTML={{__html : content}}>
    </div>
  )
}
