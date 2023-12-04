import { SITE_URL } from "@/api/constants";
import PageHero from "@/section/PageHero";
import SearchSection from "@/section/SearchSection";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Search page - The Turfman Perth',
  openGraph: {
      images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"],
      type: "article",
      url: `${SITE_URL}/search`,
      title: "Shop",
      locale: "en_US",
      siteName: "The Turfman Perth",
  },
  twitter: {
      images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"]
  }
}

const pageHeroData = {
    bgImg: {
        src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
        alt: 'page hero'
    },
    title: 'Search Results for'
  }

  
export default function page() {
  return (
    <>
        <PageHero data={pageHeroData} />
        <main className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            <SearchSection />
        </main>
    </>
  )
}
