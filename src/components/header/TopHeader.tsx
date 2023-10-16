import { faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare";
import {faPhone, faLocationDot} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const topHeaderData = {
    phone: '0410752082',
    address: '6 Anvil Way, Welshpool 6106',
    social: [
        {
            name: 'facebook',
            url: 'https://www.facebook.com/The-Turfmanperth-100268985080254'
        },
        {
            name: 'twitter',
            url: 'https://twitter.com/TurfPerth'
        },
        {
            name: 'youtube', 
            url: 'https://www.youtube.com/channel/UCj44fEc_9-1KmfdMhHdW3eg'},
        {
            name: 'insta', 
            url: 'https://www.instagram.com/turfmanperth/?hl=en'
        },
    ],
};

const faSocialIcons : {[id : string] : any} = {
    facebook: <FontAwesomeIcon icon={faFacebookSquare} className="leading-[54px]" />,
    twitter: <FontAwesomeIcon icon={faTwitter} className="leading-[54px]" />,
    youtube: <FontAwesomeIcon icon={faYoutube} className="leading-[54px]" />,
    insta: <FontAwesomeIcon icon={faInstagram} className="leading-[54px]" />
}



export default function TopHeader() {
  return (
    <div className="bg-gray-darker text-white h-[55px] leading-[55px] hidden lg:block">
            <div className="mx-auto px-3.5 max-w-full sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px] xl:max-w-[1200px] flex justify-between">
                
                <ul className=" flex items-center">
                    <li className="mx-3.5">
                        <a href="tel:+61410752082" className="text-center">
                            <FontAwesomeIcon icon={faPhone}  className="text-primary pr-2.5"/>
                            <span className="">{topHeaderData.phone}</span>
                        </a>
                    </li>
                    <li className="mx-5">
                        <a href="https://goo.gl/maps/u2kA7qvJMDfYzLW57" className="text-center">
                            <FontAwesomeIcon icon={faLocationDot} className="text-primary pr-2" />
                            <span className="">{topHeaderData.address}</span>
                        </a>
                    </li>
                </ul>
                
                <ul className="flex items-center text-white/80 text-[17px]">

                    {
                        topHeaderData.social.map(socialItem => {
                            return (
                                <li key={socialItem.name}>
                                    <a href={socialItem.url} target="_blank" 
                                        className="block w-[51px] h-[54px] leading-[54px] text-center border-x border-gray-border
                                        hover:bg-primary hover:text-white hover:border-primary transition-all ease-in-out duration-500">
                                        <span>
                                            {faSocialIcons[socialItem.name]}
                                        </span>
                                    </a>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
  )
}
