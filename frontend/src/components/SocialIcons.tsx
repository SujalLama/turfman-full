import Link from "next/link";
import FaIcons from "./FaIcons";
import { SITE_URL } from "@/api/constants";

export interface ISocialIcons {
    name: string;
    url: string;
    icon: string;
    color: string;
}

export default function SocialIcons({data, slug, title, className} : {data: ISocialIcons[]; className?: string; slug: string; title: string;}) {
  return (
    <ul className={`flex items-center text-[17px] text-white ${className ? className : ''}`}>
        {
            data.map(social => {
                return (
                    <li key={social.url}>
                        <Link href={generateSocialUrl(social.name, title, slug)} target="_blank" 
                            className="w-10 h-10 rounded-full flex items-center justify-center mr-2 bg-primary" 
                            style={{backgroundColor: social.color}}>
                            <span>
                                <FaIcons icon={social.icon} className="leading-[54px]" />
                            </span>
                        </Link>
                    </li>
                )
            })
        }
    </ul>
  )
}

function generateSocialUrl(category : string, title: string, slug: string) {
    const contentUrl = `${SITE_URL}/blogs/${slug}`;

    switch(category) {
        case 'facebook':
            return `https://facebook.com/sharer/sharer.php?u=${contentUrl}&amp;title=${title}`;
        
        case 'twitter':
            return `https://twitter.com/intent/tweet/?text=${title}&amp;url=${contentUrl}`;
        
        case 'tumblr':
            return `https://www.tumblr.com/widgets/share/tool?posttype=link&amp;title=${title};caption=${title}&amp;content=${contentUrl}&amp;canonicalUrl=%20&amp;shareSource=tumblr_share_button`;
        
        case 'pinterest':
            return `https://pinterest.com/pin/create/button/?url=${contentUrl}&amp;media=${contentUrl}&amp;description=${title}`;
        default:
            return '';
    }
}