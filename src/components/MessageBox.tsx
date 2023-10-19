import FaIcons from './FaIcons'

export default function MessageBox({icon, message} : {icon: string; message: string;}) {
  return (
    <div className="p-7.5 border-t-[3px] border-primary bg-gray/10 mb-8 flex">
        <FaIcons icon={icon} className="mr-3 text-primary" />
        <span className="text-gray-darker -mt-1">{message}</span>
    </div>
  )
}
