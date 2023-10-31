
interface IWysiwyg {
    content: string;
    className?: string;
}

export default function Wysiwyg({content, className}: IWysiwyg) {
  return (
    <div className={`prose ${!className ? "prose-ul:marker:primary marker:text-primary marker:text-lg" : className}`}
        dangerouslySetInnerHTML={{__html : content}}>
    </div>
  )
}
