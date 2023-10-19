import ContentHeader from "@/components/ContentHeader"
import ProgressBar from "@/components/ProgressBar"
import VideoBlock from "@/components/VideoBlock"
import Wysiwyg from "@/components/Wysiwyg"

const aboutMainContentData = {
    subTitle: 'About us',
    title: 'Welcome to our Award Winning Company',
    content: `
        <p>We are one of the leading turf wholesalers in Western Australia. We supply a wide variety of turf at wholesale price. In order to make your lawn look extraordinary and eye-catching, we provide you with all sorts of turf, fertiliser, soils and also assist you with your lawn makeover and do all the dirty and hard work for you. We also have equipment for commercial and residential customers available for sale and rent .We provide the services all around Perth and Mandurah Region.</p>
        <p>We supply fresh harvest, soft, beautiful and healthy turf to provide that instant roll-on-lawn look our customers want. Fresh turf, however, requires watering and treatment, for which we have instructions. We guarantee our products 100% perfect with 100% weed free. You just have to follow the simple instruction that you provide.<br />
        By offering the highest quality grass turf for sale in Perth, we strive to give our consumers the best possible experience. Therefore, the day before distribution, all of our turf is harvested fresh to order. Charges and facilities for the supply of turf vary according to various types of turf and delivery sites. Charges are confirmed at checkout before payment.</p>
    `,
    content2: `
        <p>With a large range of premium turf, we can cover all your needs:</p>
        <ul>
            <li>Wintergreen Couch</li>
            <li>Kikuyu</li>
            <li>Villagegreen Kikuyu </li>
            <li>Empire Zoysia</li>
            <li>Santa Anna</li>
            <li>Cape Soft leaf Buffalo</li>
        </ul>
    `,
    content3: `
        <p>We offer:</p>
        <ul>
            <li>Turf supplied as instant lawn rolls-on</li>
            <li>Planting gear and fertilisers</li>
            <li>Free quotes for any installation required</li>
            <li>Forklift unloading</li>
            <li>Qualified landscaper referrals</li>
        </ul>
    `,
    content4: `
        <p>For residents, landlords, investors and commercial enterprises in Perth, we have a variety of specialist turf services. The following are included in these services:</p>
        <ul>
            <li>Supplying of Turf&nbsp;</li>
            <li>Delivery of Turf&nbsp;</li>
            <li>Laying turf&nbsp;</li>
            <li>Site preparation</li>
        </ul>
    `,
    progress: [
        {
            label: 'Experience',
            percent: 90,
        },
        {
            label: 'Organic Solutions',
            percent: 80,
        },
        {
            label: 'Expertise Utilization',
            percent: 95,
        },
    ],
    video: {
        link: "//www.youtube.com/embed/_E-Bu07MWG8?autoplay=1",
        placeHolderImg: {
            src: "https://theturfman.com.au/wp-content/uploads/2020/08/observing.jpg",
            alt: "observing",
        },
    }
}

export default function AboutMainContent() {
  return (
    <section className="px-7.5 my-25 mx-auto xl:px-3.5 xl:max-w-[1200px]">
        <div className="large:flex ">
            <div className="large:w-1/2 large:pr-[70px]">
                <ContentHeader data={{subTitle: aboutMainContentData.subTitle, title: aboutMainContentData.title}} />
                <Wysiwyg 
                    content= {aboutMainContentData.content} 
                    className= 'prose-ul:marker:primary marker:text-primary marker:text-lg'
                />

                
                <div className="my-10">
                    {
                        aboutMainContentData.progress.map(prgItem => {
                            return (
                                <ProgressBar 
                                    key={prgItem.label} 
                                    label={prgItem.label} 
                                    percent={prgItem.percent}
                                    />
                            )
                        })
                    }
                    
                </div>
                {/* <!--end of progress bar--> */}

                <Wysiwyg 
                    content={aboutMainContentData.content2} 
                    className="my-10 marker:text-2xl marker:leading-[0] prose-ul:pl-6 
                        marker:text-primary prose-li:font-bold prose-li:my-2"
                />
            </div>

            <div className="relative large:w-1/2 large:pl-[70px]">
                {/* <!--video block--> */}
                <VideoBlock 
                    data={aboutMainContentData.video}
                />

                <Wysiwyg 
                    content={aboutMainContentData.content3} 
                    className="my-10 marker:text-2xl marker:leading-[0] prose-ul:pl-6 
                        marker:text-primary prose-li:font-bold prose-li:my-2"
                />
                
                <Wysiwyg 
                    content={aboutMainContentData.content4} 
                    className="my-10 marker:text-2xl marker:leading-[0] prose-ul:pl-6 
                        marker:text-primary prose-li:font-bold prose-li:my-2"
                />
            </div>
        </div>
    </section>
  )
}
