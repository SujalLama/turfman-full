import BlogsSection from "@/section/BlogsSection";
import CTASection from "@/section/CTASection";
import Feature from "@/section/Feature";
import Hero from "@/section/Hero";
import InfoCard from "@/section/InfoCard";
import MainContent from "@/section/MainContent";
import Testimonial from "@/section/Testimonial";
import WhySection from "@/section/WhySection";

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

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <MainContent />
      <Testimonial />
      <InfoCard />
      <WhySection />
      <CTASection data={ctaSectionData} className="my-25"/>
      <BlogsSection />
    </main>
  )
}
