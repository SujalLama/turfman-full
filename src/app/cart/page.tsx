import Hero from "@/section/Hero";
import PageHero from "@/section/PageHero";

const pageHeroData = {
  bgImg: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
      alt: 'page hero'
  },
  title: 'Cart'
}

export default function page() {
  return (
    <div>
      <PageHero data={pageHeroData}/>
    </div>
  )
}
