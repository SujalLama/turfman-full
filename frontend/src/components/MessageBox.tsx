import Link from 'next/link';
import FaIcons from './FaIcons'

export default function MessageBox({icon, message, link} : {icon?: string; message: string; link?: {path: string; name: string;}}) {
  return (
    <div className="p-7.5 border-t-[3px] border-primary bg-gray/10 mb-8 flex">
        <FaIcons icon={icon ?? 'faIdCard'} className="mr-3 text-primary" />
        <span className="text-gray-darker -mt-1">{message}
        {link && <Link href={link.path} className='ml-2 hover:underline'>Click Here to {link.name}</Link>}
        </span>
    </div>
  )
}
