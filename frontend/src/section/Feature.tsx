import FaIcons from "@/components/FaIcons"
import { Link } from 'nextjs13-progress';

export interface IFeature {
  icon: string;
  title: string;
  desc: string;
}


export default function Feature({data}: {data: IFeature[]}) {
  return (
    <section className="px-7.5 my-25 large:-mt-[80px] relative z-40 mx-auto xl:px-3.5 xl:max-w-[1200px]">
      <div className="text-center mb-[1px] large:hidden">
            <Link className="inline-block bg-primary hover:bg-gray-darker transition-all ease-in-out duration-500 text-white  tracking-[1px] font-medium leading-[24px] text-[13px] py-[16px] uppercase px-7.5 rounded-[5px] font-display" href="/contact" title="Contact Us">
                <span>Get quote 
                    <FaIcons icon="faArrowRight" className="ml-[12px] text-3.5" />
                </span>
            </Link>
        </div>
        <div className="px-3.5 bg-white pb-[50px] pt-10 rounded-[2px] border-t-[3px] large:border-t-0 large:border-b-[3px] border-primary shadow-sm md:flex md:items-start">
            
            {
              data.map((featureItem, i) => {
                return (
                  <div key={featureItem.desc} className={`flex items-center md:items-start md:px-3.5 md:flex-1 ${i == (data.length - 1) ? '' : 'mb-6 md:mb-0'}`}>
                      <div className="w-[65px] h-[65px] rounded-full bg-gray-darker text-white flex shrink-0 items-center justify-center mr-3.5">
                          <FaIcons icon={featureItem.icon} className="text-3xl" />
                      </div>
                  
                      <div>
                          <h2 className="text-[17px] md:text-lg leading-tight mb-[7px] text-gray-darker font-semibold">{featureItem.title}</h2>								
                          <p className="leading-tight prose prose-span:leading-normal">
                            {
                              featureItem.desc.split('<br>').map(descItem => {
                                return <div className="my-1" key={descItem}>{descItem}</div>
                              })
                            }  
                          </p>							
                      </div>
                      
                  </div>
                )
              })
            }
        </div>
        
    </section>
  )
}
