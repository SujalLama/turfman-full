import IconListView from "@/layouts/IconListView";
import AboutMainContent from "@/section/AboutMainContent";
import CTASection from "@/section/CTASection";
import PageHero from "@/section/PageHero";
import ServiceSection from "@/section/ServiceSection";

const pageHeroData = {
  bgImg: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
      alt: 'page hero'
  },
  title: 'About'
}

const ctaSectionData = {
  img: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/img-08-1.jpg?id=13764',
      alt: 'cta image'
  },
  title: "Do you have grass farm which you would like to sell or manage?",
  links: [
      {
          name: 'Reach Us',
          path: '/',
      },
      {
          name: 'Manage Turf',
          path: '/',
      },
  ]
}

export default function page() {
  return (
    <main>
      <PageHero  data={pageHeroData}/>
      <AboutMainContent />
      <IconListView />
      <ServiceSection />
      <CTASection data={ctaSectionData}/>
    </main>
  )
}
