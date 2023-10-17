import FaIcons from "./FaIcons";

interface IIconCard {
    data: {icon: string; desc: string; label: string};
    className?: string;
}

export default function IconCard({data, className}: IIconCard) {
  return (
    <div className={`flex my-8 md:mb-0  md:w-1/2 large:w-1/3 xl:w-1/4 ${className ? className : ''}`}>
        <div className=" mr-7.5 large:mr-3.5  text-primary">
            <FaIcons icon={data.icon} className="text-[55px]" />
        </div>			
        <div className="md:w-28">
            <h2 className="text-[36px] leading-[1.1] text-gray-darker font-black">{data.desc}</h2>				
            <p className="mb-2.5">{data.label}</p>					
        </div>
    </div>
  )
}
