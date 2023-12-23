import Image from "next/image";
import { Link } from 'nextjs13-progress';

export interface IImgLinkProps {
    img: {src: string; alt: string};
    link: {path: string, target?: string};
}

export default function ImgLink({data}: {data: IImgLinkProps}) {
  return (
    <Link className="pt-[35px] inline-block" href={data.link.path} target={data.link.target}>
        <Image 
            width="400" 
            height="533" 
            src={data.img.src} 
            className="" 
            alt={data.img.alt}
        />
    </Link>
  )
}
