import { SITE_URL } from "@/api/constants";
import { aboutData } from "@/data/aboutData";
import IconListView, { IIcon } from "@/layouts/IconListView";
import AboutMainContent, { IAboutMain } from "@/section/AboutMainContent";
import CTASection, { ICtaSection } from "@/section/CTASection";
import PageHero, { IPageHero } from "@/section/PageHero";
import ServiceSection, { IService } from "@/section/ServiceSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'About Us - The Turfman Perth',
  description: 'We are one of the leading turf wholesalers in Western Australia. We supply a wide variety of turf at wholesale price.',
  publisher: "https://facebook.com/theTurfmanPerth",
  openGraph: {
    images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"],
    type: "article",
    url: `${SITE_URL}/about`,
    title: "About Us",
    locale: "en_US",
    siteName: "The Turfman Perth",
  },
  twitter: {
    images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"],
  }
}

export default function page() {
  return (
    <main>
      {
        aboutData.sections.map(section => {
          if(section.name === "pageHero") {
            return <PageHero key={section.name} data={section.content as IPageHero} />
          }

          if(section.name === "aboutMainContent") {
            return <AboutMainContent key={section.name} data={section.content as IAboutMain} />
          }

          if(section.name === "iconListView") {
            return <IconListView key={section.name} data={section.content as IIcon[]} />
          }

          if(section.name === "service") {
            return <ServiceSection key={section.name} data={section.content as IService} />
          }

          if(section.name === "cta") {
            return <CTASection key={section.name} data={section.content as ICtaSection} />
          }
        })
      }
    </main>
  )
}
