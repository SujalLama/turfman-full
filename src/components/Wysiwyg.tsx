
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

export default function Wysiwyg() {
  return (
    <div className="prose prose-ul:marker:primary marker:text-primary marker:text-lg" dangerouslySetInnerHTML={{__html : wysiwygData.content}}>
    </div>
  )
}
