import FaIcons from "./FaIcons";

interface IIconTopCard {
    icon: string;
    title: string;
    desc: string;
}

export default function IconTopCard({data}: {data: IIconTopCard}) {
  return (
    <div className="mb-10 md:w-[calc(50%_-_40px)] large:w-[calc(33.33%_-_40px)] xl:w-[calc(25%_-_40px)] md:mx-5 p-7.5 bg-border-color border border-primary rounded-[5px] text-center">                        
        <FaIcons icon={data.icon} className="text-primary text-[50px] mb-7.5"/>
        <h3 className="font-bold text-[22px] mb-[8px] leading-tight">
            {data.title}
        </h3>
        <p className="text-white/90">{data.desc}</p>
    </div>
  )
}
