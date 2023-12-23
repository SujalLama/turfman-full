import FaIcons from "@/components/FaIcons"
import { Link } from 'nextjs13-progress';

interface IContactDetails {
    icon: string;
    title: string;
    link: {
        path: string;
        name: string;
    }
}

export interface ISocial {
    name: string;
    url: string;
    icon: string;
}

export interface IContactBlock {
    title: string;
    contacts: IContactDetails[];
    socials: ISocial[]
}

export default function SideContactBlock({data}: {data: IContactBlock}) {
  return (
    <div className="bg-primary text-white p-6 sm:p-10 rounded-[5px] ">
        
        <div className="flex items-center justify-center flex-col mb-8 md:mb-12">
            <h2 className="text-[25px] md:text-[30px] large:text-[35px] font-bold leading-tight mb-8">
                {data.title}
            </h2>
            <ul className="flex items-center text-white -mx-4 text-[17px]">
                    {
                        data.socials.map(socialItem => {
                            return (
                                <li key={socialItem.name}>
                                    <Link href={socialItem.url} target="_blank" 
                                        className="hover:text-white/70 mx-4">
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

        <div className="md:flex md:flex-wrap lg:flex-nowrap gap-8 lg:gap-0 lg:justify-around bg-primary/20 border-t pt-8 md:pt-12">
            {
                data.contacts.map(contact => {
                    return (
                        <div key={contact.title} className="flex mb-4">
                            <FaIcons icon={contact.icon} className="text-3xl w-7.5  mr-6 shrink-0" />
                            <div>
                                <strong className="font-bolder mb-[5px]">{contact.title}</strong><br />
                                <Link href={contact.link.path} className="break-all hover:text-white/70 transition-all duration-500 ease-in-out">
                                    {contact.link.name}
                                </Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>

        
    </div>
  )
}
