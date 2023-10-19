import AnimatedCounter from "@/components/AnimatedCounter";
import Image from "next/image";

const testimonialData = {
    bgImg: {
        url: "https://theturfman.com.au/wp-content/uploads/2020/09/turf-in-Western-Australia.jpg?id=13724",
        alt: "bg image",
    },
    title: "Always available for turf needs.",
    subTitle: "turf whole seller in Perth",
    link: {
        path: "/",
        text: "Learn More",
    },
    details: [
        {
            label: 5976,
            title: 'Happy Clients and Projects',
            desc: 'Wholesale, retail, commercial, clubbing customers. and the count still goes on and on.',
        },
        {
            label: 12,
            title: 'Varieties of turf',
            desc: 'Healthy Turf, Strength and quality certified turf.',
        },
    ]
}

export default function Testimonial() {
  return (
    <section className="relative">
        <div className="absolute top-0 left-0 w-full h-full -z-10">
            <Image src={testimonialData.bgImg.url} fill alt={testimonialData.bgImg.alt} className="object-fit object-cover" />
        </div>

        <div className="px-7.5 py-25 mx-auto xl:px-3.5 xl:max-w-[1200px] text-white">
            <div className="large:flex large:justify-between">
                <div className="mb-[80px] large:w-[40%] large:pr-8">
                    <p className="text-[13px] md:text-[14px] tracking-[2px] uppercase font-bold text-[rgba(255,255,255,.95)]">
                        {
                            testimonialData.subTitle
                        }
                    </p>
                    <h2 className="text-[25px] md:text-[35px] large:text-[40px] font-bold mb-5">
                        {
                            testimonialData.title
                        }
                    </h2>
                    <a 
                        className="inline-block hover:bg-primary text-primary transition-all ease-in-out duration-500 hover:text-white  tracking-[1px] font-medium leading-[24px] text-[13px] py-3.5 px-7.5 border-[2px] border-primary uppercase rounded-[5px] font-display" 
                        href={testimonialData.link.path}>
                        {testimonialData.link.text}
                    </a>
                </div>

                <div className="md:flex large:flex-col large:w-[55%]">
                    {
                        testimonialData.details.map(detail => {
                            return (
                                <div key={detail.title} className="mb-[80px] md:w-1/2 large:w-full large:flex large:items-start large:justify-between first:md:mr-8 first:large:mr-0">
                                    <h3 className="text-[72px] leading-[1.3] large:leading-none text-primary font-bold">
                                        <AnimatedCounter endValue={detail.label} />
                                    </h3>
                                    <div className="large:w-[65%] large:ml-8">
                                        <h4 className="font-bold text-[22px] mb-[8px]">
                                            {detail.title}
                                        </h4>
                                        <p>
                                            {detail.desc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                    }
                
                </div>
            </div>
        </div>
    </section>
  )
}
