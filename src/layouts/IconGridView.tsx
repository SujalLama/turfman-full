import FaIcons from "@/components/FaIcons"

const iconGridViewData = [
    {
        icon: 'faIdCard',
        title: 'Fresh Roll-on Lawn',
        desc: 'All freshly cut and delivery at earliest at your door step.',
    },
    {
        icon: 'faIdCard',
        title: 'Earth Work',
        desc: 'Decorate surface as canvas. Old soil removal and leveling of earth',
    },
    {
        icon: 'faIdCard',
        title: 'Planting Gear and, Fertiliser',
        desc: 'Well tested and reputed gears & fertilisers keep healthy lawns',
    },
    {
        icon: 'faIdCard',
        title: 'Maintenance',
        desc: 'We have the best service for you. Different contractual services to manage lawn and grass.',
    },
    {
        icon: 'faIdCard',
        title: 'Wide range of varieties',
        desc: 'We provide wide range of varieties. Every grass having different strength and health. Every needs managed differently.',
    },
    {
        icon: 'faIdCard',
        title: 'Certified Experts',
        desc: 'Providing expert opinion and expert decision for better quality in handling grasses & lawns',
    },
]


export default function IconGridView() {
  return (
        <div className="md:flex md:flex-wrap md:-mx-4">
            {
                iconGridViewData.map(iconGrid => {
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
