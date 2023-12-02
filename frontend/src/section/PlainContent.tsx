
const plainContentData = [
    {
        title: 'Satisfaction Guaranteed',
        desc: 'The Turf Man has been around for over five years. Our longevity is due to our devotion to our customers and providing them with the highest quality products and exceptional customer service that we possibly can. We are located in Perth, Australia. In these states, we are the number one family-owned and operated Turf provide and installation service. We outshine all the rest by building a reputation for providing superior customer service and a superior product.'
    },
    {
        title: 'Our Customer Support',
        desc: 'The Turf Man is a company that is rooted in customer satisfaction and quality. You can rest assured to know that The Turf&nbsp; Man will always comply with local and state mandates when it comes to the safety of your lawn and your health. If you have any questions involving our services, our service area, or any other related topic, feel free to contact us using our contact us form.'
    },
]

export interface IPlainContent {
    title: string;
    desc: string;
}
export default function PlainContent({data}: {data: IPlainContent[]}) {
  return (
    <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <div className="mb-20 md:flex md:flex-wrap md:-mx-10">
            {
                data.map(content => {
                    return (
                        <div key={content.title} className="my-10 md:w-1/2 md:px-10">
                            <h2 className="text-gray-darker text-[30px] large:text-[35px] font-bold mb-5">{content.title}</h2>
                            <p>{content.desc}</p>
                        </div>
                    )
                })
            }
        </div>
    </section>
  )
}
