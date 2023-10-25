import { aboutData } from "@/data/aboutData";
import IconListView, { IIcon } from "@/layouts/IconListView";
import AboutMainContent, { IAboutMain } from "@/section/AboutMainContent";
import CTASection, { ICtaSection } from "@/section/CTASection";
import PageHero, { IPageHero } from "@/section/PageHero";
import ServiceSection, { IService } from "@/section/ServiceSection";


export default function page() {
  return (
    <main>
      {
        aboutData.sections.map(section => {
          if(section.name === "pageHero") {
            return <PageHero data={section.content as IPageHero} />
          }

          if(section.name === "aboutMainContent") {
            return <AboutMainContent data={section.content as IAboutMain} />
          }

          if(section.name === "iconListView") {
            return <IconListView data={section.content as IIcon[]} />
          }

          if(section.name === "service") {
            return <ServiceSection data={section.content as IService} />
          }

          if(section.name === "cta") {
            return <CTASection data={section.content as ICtaSection} />
          }
        })
      }
    </main>
  )
}
