import FaIcons from "@/components/FaIcons"
import Link from "next/link"

const sideContactData = {
    title: 'Start a new project?',
    contacts: [
        {
            icon: 'faLocationDot',
            title: 'Address',
            link: {
                path: 'https://goo.gl/maps/u2kA7qvJMDfYzLW57',
                name: '6 Anvil Way, Welshpool, 6106'
            }
        },
        {
            icon: 'faPhone',
            title: 'Contact',
            link: {
                path: 'tel:+61410752082',
                name: '0410752082'
            }
        },
        {
            icon: 'faEnvelope',
            title: 'Email',
            link: {
                path: 'mailto:contact@theturfman.com.au',
                name: 'contact@theturfman.com.au'
            }
        },
    ],
    socials: [
        {
            name: 'facebook',
            url: 'https://www.facebook.com/The-Turfmanperth-100268985080254',
            icon: 'faFacebookSquare'
        },
        {
            name: 'twitter',
            url: 'https://twitter.com/TurfPerth',
            icon: 'faTwitter'
        },
        {
            name: 'youtube', 
            url: 'https://www.youtube.com/channel/UCj44fEc_9-1KmfdMhHdW3eg',
            icon: 'faYoutube',
        },
        {
            name: 'insta', 
            url: 'https://www.instagram.com/turfmanperth/?hl=en',
            icon: 'faInstagram'
        },
    ],
}

export default function SideContactBlock() {
  return (
    <div className="bg-primary text-white px-6 py-10 sm:p-10 mb-6 rounded-[5px]">
        <h2 className="text-[25px] md:text-[30px] large:text-[35px] font-bold leading-tight">
            {sideContactData.title}
        </h2>

        <div className="my-10">
            {
                sideContactData.contacts.map(contact => {
                    return (
                        <div key={contact.title} className="flex items-center mb-3.5">
                            <FaIcons icon={contact.icon} className="text-3xl w-7.5 text-white mr-6 shrink-0" />
                            <div>
                                <strong className="font-bolder mb-[5px]">{contact.title}</strong><br />
                                <Link href={contact.link.path} className="break-all hover:text-white/80 transition-all duration-500 ease-in-out">
                                    {contact.link.name}
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        <ul className="flex items-center text-white -mx-4 text-[17px]">
                {
                    sideContactData.socials.map(socialItem => {
                        return (
                            <li key={socialItem.name}>
                                <Link href={socialItem.url} target="_blank" 
                                    className="hover:text-white/80 mx-4">
                                    <span>
                                        <FaIcons icon={socialItem.icon} className="text-2xl" />
                                    </span>
                                </Link>
                            </li>
                        )
                    })
                }
        </ul>
    </div>
  )
}
