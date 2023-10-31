import FaIcons from "@/components/FaIcons"

export interface IIconGridView {
    icon: string;
    title: string;
    desc: string;
}

export default function IconGridView({data}: {data: IIconGridView[]}) {
  return (
        <div className="md:flex md:flex-wrap md:-mx-4">
            {
                data.map(iconGrid => {
                    return (
                        <div key={iconGrid.title} className="md:w-1/2 md:px-4 large:w-1/3 flex align-baseline mb-10 large:mb-[60px]">
                            <div className=" mr-7.5   text-primary">
                                <FaIcons icon={iconGrid.icon} className="text-[55px]" />
                            </div>			
                            <div className="">
                                <h2 className="text-5 leading-[1.1] text-gray-darker mb-2.5 font-semibold">{iconGrid.title}</h2>				
                                <p className="mb-2.5">{iconGrid.desc}</p>					
                            </div>
                        </div>
                    )
                })
            }
        </div>
  )
}
