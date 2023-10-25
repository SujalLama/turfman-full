import BlogsSection, { IBlogSection } from "@/section/BlogsSection";
import CTASection, { ICtaSection } from "@/section/CTASection";
import Feature, { IFeature } from "@/section/Feature";
import Hero, { IHero } from "@/section/Hero";
import InfoCard, { IInfoCard } from "@/section/InfoCard";
import MainContent, { IMainContent } from "@/section/MainContent";
import Testimonial, { ITestimonial } from "@/section/Testimonial";
import WhySection, { IWhy } from "@/section/WhySection";
import { homePageData } from "@/data/homeData";

export default function Home() {
  return (
    <main>
      {
        homePageData.sections.map(section => {
          if(section.name === "hero") {
            return <Hero key={section.name} data={section.content as IHero[]} />
          }

          if(section.name === "feature") {
            return <Feature key={section.name} data={section.content as IFeature[]} />
          }

          if(section.name === "mainContent") {
            return <MainContent key={section.name} data={section.content as IMainContent} />
          }

          if(section.name === "testimonial") {
            return <Testimonial key={section.name} data={section.content as ITestimonial} />
          }

          if(section.name === "infoCard") {
            return <InfoCard key={section.name} data={section.content as IInfoCard} />
          }

          if(section.name === "whyUs") {
            return <WhySection key={section.name} data={section.content as IWhy} />
          }

          if(section.name === "cta") {
            return <CTASection data={section?.content as ICtaSection} className="my-25"/>
          }

          if(section.name === "blogsList") {
            return <BlogsSection data={section.content as IBlogSection} />
          }

        })
      }
    </main>
  )
}
