import Image from "next/image";
import Link from "next/link";

interface IImgLinkProps {
    img: {src: string; alt: string};
    link: {path: string, target?: string};
}

export default function ImgLink({link, img}: IImgLinkProps) {
  return (
    <Link className="pt-[35px] inline-block" href={link.path} target={link.target}>
        <Image 
            width="400" 
            height="533" 
            src={img.src} 
            className="" 
            alt={img.alt}
        />
    </Link>
  )
}
