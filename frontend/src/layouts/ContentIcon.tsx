import FaIcons from "@/components/FaIcons"

const contentIcon = [
    {
        icon: 'faIdCard',
        content : {
            heading: '15 Years',
            paragraph: 'of Turf Experience'
        }
    },
    {
        icon: '',
        content : {
            paragraph: 'Call to ask any question',
            heading: '0410752082',
        }
    },
]

export interface IcontentIcon {
    icon: string;
    content: {paragraph: string; heading: string;}
}

export default function ContentIcon({data}: {data : IcontentIcon[]}) {
  return (
    <div className="my-12 border-t border-[#e7e7e7] md:flex">
        <div className="flex  my-8 md:my-0 md:pt-8">
            <div className=" mr-7.5  text-primary">
                <FaIcons icon="faIdCard"  className="text-[55px]"/>
            </div>			
            <div className="">
                <h2 className="text-xl leading-[1.1] text-gray-darker mb-2.5 font-semibold">
                {data[0].content.heading} 
                </h2>				
                <p className="mb-2.5">{data[0].content.paragraph} </p>					
            </div>
        </div>
        <div className="md:pt-8 md:ml-14 md:pl-8 md:border-l md:border-[#e7e7e7]">
            <p className="mb-2.5">
                {data[1].content.paragraph}    
            </p>					
            <h2 className="text-xl leading-[1.1] text-gray-darker mb-2.5 font-semibold">
                {data[1].content.heading}
            </h2>				
        </div>
    </div>
  )
}
