import PageHeader, { IPageHeader } from "@/section/PageHeader";
import ContactForm from "@/forms/ContactForm";
import SideContactBlock, { IContactBlock } from "@/section/SideContactBlock";
import GoogleMap from "@/components/GoogleMap";
import PlainContent, { IPlainContent } from "@/section/PlainContent";
import { contactData } from "@/data/contactData";
import PageHero from "@/section/PageHero";

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
          if(section.name === "pageHeader") {
            // return <PageHeader key={section.name} data={section.content as IPageHeader} />
            return <div key={section.name}>
              <PageHero key={section.name} data={pageHeroData}/>
                <div className="my-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
                  {/* <p dangerouslySetInnerHTML={{__html: section?.content?.desc as string}}>
                    </p> */}
                </div>
              </div>
          }

          
        })
      }
      
      {/* <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <div className="my-25 large:flex large:-mx-7.5">
            {
              contactData.sections.map(section => {
                if(section.name === "contactForm") {
                  return <ContactForm key={section.name} />
                }
              })
            }
            

            
            <div className="my-25 large:my-0 large:mx-0 large:w-2/5 large:px-7.5">
                {
                  contactData.sections.map(section => {
                    if(section.name === "contactBlock") {
                      return <SideContactBlock key={section.name} data={section.content as IContactBlock} />
                    }

                    if(section.name === "map") {
                      return <GoogleMap key={section.name} />
                    }
                    
                  })
                }
                
            </div>
        </div>
      </section> */}

      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            {
              contactData.sections.map(section => {
                if(section.name === "contactForm") {
                  return <ContactForm key={section.name} />
                }
              })
            }
      </section>

      <section className="my-20 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <div className="my-25 md:flex md:flex-wrap md:-mx-10">
          {
            contactData.sections.map(section => {
              
              if(section.name === "contactBlock") {
                return <div key={section.name} className="my-10 md:w-1/2 md:px-10"><SideContactBlock data={section.content as IContactBlock} /></div>
              }

              if(section.name === "map") {
                return <div key={section.name} className="my-10 md:w-1/2 md:px-10"><GoogleMap /></div>
              }
            })
          }
        </div>
      </section>

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
