import Image from 'next/image';
import Link from 'next/link'

export interface IImgListCardProps {
  link: string;
  title: string;
  desc?: string;
  img: {src: string; alt: string};
  alignImg?: string;
}

export default function ImgListCard({link, title, desc, alignImg = 'left', img} : IImgListCardProps) {

  if(alignImg == 'left') {
    return (
      <div className="flex mb-3">
          <Link href={link} className="w-[70px] h-[70px] block mr-3.5 shrink-0">    
              <Image 
                width="150" 
                height="150" src={img.src} 
                className="w-full h-full object-cover object-center" 
                alt={img.alt} 
              />
          </Link>
          <Link href={link} className='hover:text-primary transition-colors duration-500 ease-in-out'>{title}</Link>
      </div>
    )
  }

  if(alignImg == 'right') {
    return (
      <div className="flex justify-between mb-3">
          <div>
              <Link href={link} className="hover:text-primary transition-colors duration-500 ease-in-out">
                  <span>{title}</span><br />
              </Link>
              {desc && <span className="text-[13px] font-normal text-gray-text">{desc}</span>}
          </div>

          <Link href={link} className="w-[54px] h-[54px] block ml-5 shrink-0 bg-white border border-black/10">
              <Image 
                width="150" 
                height="150"
                className="w-full h-full object-cover object-center" 
                src={img.src} 
                alt={img.alt}
                />		
          </Link>
      </div>
    )
  }
}
