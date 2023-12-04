import { SITE_URL } from "@/api/constants"
import { shopData } from "@/data/shopData"
import PageHero, { IPageHero } from "@/section/PageHero"
import ProductsMainContent from "@/section/ProductsMainContent"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Shop - The Turfman Perth',
  description: 'Eco-wet is a fast-acting product that improves soil structure and increases beneficial microbial activity to keep waxy sands, heavy clays, and other generally water-repellent soils wet for longer. Itt is different from other wetters since it contains natural polymers that strengthen the soil structure without harming it. The natural polymer that has been introduced functions as a sponge, generating a long-term solution.',
  publisher: "https://facebook.com/theTurfmanPerth",
  openGraph: {
      images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"],
      type: "article",
      url: `${SITE_URL}/shop`,
      title: "Shop",
      locale: "en_US",
      siteName: "The Turfman Perth",
  },
  twitter: {
      images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"]
  }
}


export default async function Page() {
  return (
    <main>
      {
        shopData.sections.map(section => {
          if(section.name === "pageHero") {
            return <PageHero key={section.name} data={section.content as IPageHero} />
          }

        })
      }
      <ProductsMainContent />
    </main>
  )
}
