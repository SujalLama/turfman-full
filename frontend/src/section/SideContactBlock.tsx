import FaIcons from "@/components/FaIcons"
import Link from "next/link"

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
    <div className="bg-primary text-white px-6 py-10 sm:p-10 mb-6 rounded-[5px]">
        <h2 className="text-[25px] md:text-[30px] large:text-[35px] font-bold leading-tight">
            {data.title}
        </h2>

        <div className="my-10">
            {
                data.contacts.map(contact => {
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
                    data.socials.map(socialItem => {
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
