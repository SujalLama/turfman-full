import Link from "next/link";
import FaIcons from "./FaIcons";

interface ISocialIcons {
    name: string;
    url: string;
    icon: string;
    color: string;
}

export default function SocialIcons({data} : {data: ISocialIcons[]}) {
  return (
    <ul className="flex items-center text-[17px] text-white">
        {
            data.map(social => {
                return (
                    <li key={social.url}>
                        <Link href="https://www.facebook.com/The-Turfmanperth-100268985080254" target="_blank" 
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
