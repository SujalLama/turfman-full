import { Link } from 'nextjs13-progress';
import FaIcons from './FaIcons'

export default function MessageBox({icon, message, link, success = true} : {
  icon?: string; message: string; link?: {path: string; name: string;}; success?: boolean; }) {

  const containerClassname = success ? 'border-primary' : 'border-red';
  const iconClassname = success ? 'text-primary' : 'text-red';
  return (
    <div className={`p-7.5 border-t-[3px] bg-gray/10 mb-8 flex ${containerClassname}`}>
        <FaIcons icon={icon ?? (success ? 'faSquareCheck' :'faCircleExclamation')} className={`mr-3 ${iconClassname}`} />
        <span className="text-gray-darker -mt-1 break-words">
          <span>{message}</span>
        {link && <Link href={link.path} className='ml-2 hover:underline'>Click Here to {link.name}</Link>}
        </span>
    </div>
  )
}
