import IconListView from "@/layouts/IconListView";
import AboutMainContent from "@/section/AboutMainContent";
import PageHero from "@/section/PageHero";

const pageHeroData = {
  bgImg: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
      alt: 'page hero'
  },
  title: 'About'
}

export default function page() {
  return (
    <main>
      <PageHero  data={pageHeroData}/>
      <AboutMainContent />
      <IconListView />
    </main>
  )
}
