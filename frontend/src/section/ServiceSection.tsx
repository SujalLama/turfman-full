import IconTopCard, { IIconTopCard } from "@/components/IconTopCard"
import Image from "next/image"

const data = {
    bgImg: {
        src: "https://theturfman.com.au/wp-content/uploads/2020/09/turf-in-Western-Australia.jpg?id=13724",
        alt: "turf in Western australia"
    },
    subtitle: 'services offered',
    title: 'We always ready to provide different services',
    desc: `Each field task needs different gears and different expertise solutions.<strong className="text-white"> The turf man</strong>  not only handles services but also care for work health, safety and customer service.`,
    iconList: [
        {
            icon: 'faSquareFontAwesomeStroke',
            title: 'Soil preparation',
            desc: 'Removal of old lawn, weeds at required pace.'
        },
        {
            icon: 'faSquareFontAwesomeStroke',
            title: 'Soil preparation',
            desc: 'Removal of old lawn, weeds at required pace.'
        },
        {
            icon: 'faSquareFontAwesomeStroke',
            title: 'Soil preparation',
            desc: 'Removal of old lawn, weeds at required pace.'
        },
        {
            icon: 'faSquareFontAwesomeStroke',
            title: 'Soil preparation',
            desc: 'Removal of old lawn, weeds at required pace.'
        },
        {
            icon: 'faSquareFontAwesomeStroke',
            title: 'Soil preparation',
            desc: 'Removal of old lawn, weeds at required pace.'
        },
    ]
}

export interface IService {
    bgImg: {src: string; alt: string;};
    subtitle: string;
    title: string;
    desc: string;
    iconList: IIconTopCard[]
}

export default function ServiceSection({data}: {data: IService}) {
  return (
    <section className="relative">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image 
                src={data.bgImg.src}
                alt={data.bgImg.alt}
                fill
                className="object-center object-cover"
            />
        </div>
        <div className="px-7.5 py-25 sm:mx-auto sm:max-w-[540px] md:max-w-[720px] xl:px-3.5 large:max-w-[960px] xl:max-w-[1200px] text-white">
            <div className="mb-[80px] md:flex md:-mx-5">
                <div className="md:w-1/2 md:px-5">
                    <p className="text-[13px] mb-1.5 md:text-[14px] tracking-[2px] uppercase font-bold text-[rgba(255,255,255,.95)]">
                        {data.subtitle}
                    </p>
                    <h2 className="text-[25px] md:text-[30px] large:text-[35px] font-bold mb-5">
                        {data.title}
                    </h2>
                </div>

                <p className="text-white/90 md:w-1/2 md:px-5" dangerouslySetInnerHTML={{__html: data.desc}}>
                    
                </p>
            </div>

            <div className="md:flex md:flex-wrap md:-mx-5">
                {
                    data.iconList.map(iconItem => {
                        return (
                            <IconTopCard key={iconItem.title} data={iconItem}/>
                        )
                    })
                }
            </div>
        
        </div>
    </section>
  )
}
