import PageHeader, { IPageHeader } from "@/section/PageHeader";
import ContactForm from "@/forms/ContactForm";
import SideContactBlock, { IContactBlock } from "@/section/SideContactBlock";
import GoogleMap from "@/components/GoogleMap";
import PlainContent, { IPlainContent } from "@/section/PlainContent";
import { contactData } from "@/data/contactData";
import PageHero from "@/section/PageHero";
import { Metadata } from "next";
import { SITE_URL } from "@/api/constants";

export const metadata: Metadata = {
  title: 'Contact Us | Support | Service Call | Question - The Turfman Perth',
  description: 'Contact Us, Whether you have a question about features, pricing, need a demo, or anything else, our team is ready to answer 24/7.',
  publisher: "https://facebook.com/theTurfmanPerth",
  openGraph: {
    images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"],
    type: "article",
    url: `${SITE_URL}/contact`,
    title: "Contact Us",
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
  title: 'Contact'
}

export default function Page() {
  return (
    <main>
      {
        contactData.sections.map(section => {
          if(section.name == "pageHeader") {
            const {desc} = section.content as {desc: string;};

            return <div key={section.name}>
              <PageHero key={section.name} data={pageHeroData}/>
                <div className="my-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
                  <div className="w-full lg:w-[80%] text-center mx-auto">
                    <p dangerouslySetInnerHTML={{__html: desc}}>
                      </p>
                  </div>
                </div>
              </div>
          }

          return null;
        })
      }

      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">

          <div className="w-full lg:w-[65%] mx-auto">
              {
                contactData.sections.map(section => {
                  if(section.name === "contactForm") {
                    return (
                          <ContactForm  key={section.name} />
                          )
                        }
                      })
                    }
          </div>
        
      </section>

      <div className="my-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
      
          {
            
              contactData.sections.map(section => {
                if(section.name === "contactBlock") {
                  return <SideContactBlock data={section.content as IContactBlock} key={section.name} />
                }
              
                if(section.name === "map") {
                  return <GoogleMap key={section.name} />
                }
              })
            
          }
      </div>

      <section>
            {
              contactData.sections.map(section => {
                if(section.name === "plainContent") {
                  return <PlainContent key={section.name} data={section.content as IPlainContent[]} />
                }
              })
            }
        </section>      
    </main>
  )
}
