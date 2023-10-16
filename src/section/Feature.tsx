
export default function Feature() {
  return (
    <section className="px-7.5 my-25 large:-mt-[80px] relative z-40 mx-auto xl:px-3.5 xl:max-w-[1200px]">
        <div className="px-3.5 bg-white pb-[50px] pt-10 rounded-[2px] border-b-[3px] border-primary shadow-sm md:flex md:items-start">
            
            <div className="flex items-center mb-6 md:mb-0 md:px-3.5 md:flex-1">
                
                <div className="w-[65px] h-[65px] rounded-full bg-gray-darker text-white flex shrink-0 items-center justify-center mr-3.5">
                    <i className="fa-solid fa-hand-holding-heart text-3xl"></i>
                </div>
            
                <div className="">
                    <h2 className="text-[17px] md:text-lg leading-tight mb-[7px] text-gray-darker font-semibold">Quality Product Services</h2>								
                    <p className="leading-tight">Trusted services to clients.</p>							
                </div>
                
            </div>

            <div className="flex items-center mb-6 md:mb-0 md:px-3.5 md:flex-1">
                <div className="w-[65px] h-[65px] rounded-full bg-gray-darker text-white flex shrink-0 items-center justify-center mr-3.5">
                    <i className="fa-solid fa-phone-volume text-3xl"></i>
                </div>
            
                <div className="">
                    <h2 className="text-[17px] md:text-lg leading-tight mb-[7px] text-gray-darker font-semibold">Support</h2>								
                    <a href="tel:+61410752082" title="Contact">10AM-4PM<br />0410752082</a>							
                </div>
            </div>

            <div className="flex items-center md:px-3.5 md:flex-1">
                
                <div className="w-[65px] h-[65px] rounded-full bg-gray-darker text-white flex shrink-0 items-center justify-center mr-3.5">
                    <i className="fa-solid fa-user text-3xl"></i>
                </div>
            
                <div className="">
                    <h2 className="text-[17px] md:text-lg leading-tight mb-[7px] text-gray-darker font-semibold">Well Experienced</h2>
                    <p className="leading-tight">15 years of experience</p>
                </div>
            </div>
        </div>
        <div className="text-center mt-[0.3px] large:hidden">
            <a className="inline-block bg-primary hover:bg-gray-darker transition-all ease-in-out duration-500 text-white  tracking-[1px] font-medium leading-[24px] text-[13px] py-[16px] uppercase px-7.5 rounded-[5px] font-display" href="./contact-us.html" title="Contact Us">
                <span>Get quote 
                    <i className="fa-solid fa-arrow-right ml-[12px] text-3.5"></i>
                </span>
            </a>
        </div>
    </section>
  )
}
