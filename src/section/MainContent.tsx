import CircularBadge from "@/components/CircularBadge";
import ContentHeader from "@/components/ContentHeader";
import Gallery from "@/components/Gallery";
import Wysiwyg from "@/components/Wysiwyg";
import ContentIcon from "@/layouts/ContentIcon";

const contentHeaderContent = {
    subTitle: 'Who we are',
    title: 'The Turf Man Provides Reliable Quality Turf'
}
const wysiwygData = {
    content: `<p>The Turf Man is Australia’s one of the best turf providers. We provide turf solutions for residential turf, commercial turf, urban 
                    <a href="https://theturfman.com.au/pick-the-right-turf/">turf solutions</a>. We also provide Turf Installation and Turf Supply. Freshly cut grass will be available just near your location. Turf Man is just a call away for your need.</p>
                <p>We supply Wintergreen Couch, Premium Kikuyu, Villagegreen Kikuyu, Santa Anna and Cape Soft Buffalo turfs. We also provide Sir Walter Buffalo, Palmetto. Turf Man is one of the best turf providers in Western Australia. We are the whole seller for all major turf in
                    <a href="https://www.google.com/maps/place/Unit+6%2F505+Walter+Rd+E,+Morley+WA+6062,+Australia/@-31.8941537,115.9230373,17z/data=!3m1!4b1!4m5!3m4!1s0x2a32b0a18fcfffff:0x288983d2038aa568!8m2!3d-31.8941537!4d115.925226?hl=en"> Perth</a>.
                </p>
                <ul>
                    <li>
                        Every project needs different variety of turf. We have collection different turf. 
                    </li>
                    <li>
                        Providing platform to sell your grass with best market value. Even long term solutions.
                    </li>
                    <li>
                        We have different varieties of product to manage health of grass-health of turf for different season.
                    </li>
                </ul>`
}

export default function MainContent() {
  return (
    <section className="px-7.5 my-25 mx-auto xl:px-3.5 xl:max-w-[1200px]">
        <div className="large:flex">
            <div className="large:w-1/2 large:mr-14">
                <ContentHeader data={contentHeaderContent} />
                <Wysiwyg content={wysiwygData.content} />
                <ContentIcon />
            </div>

            <div className="relative large:w-1/2">
                <Gallery />
                <div className="hidden sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 bg-white shadow-lg sm:w-[165px] sm:h-[165px] sm:rounded-full sm:flex sm:items-center sm:justify-center">
                    <CircularBadge />
                </div>
            </div>
        </div>
    </section>
  )
}
