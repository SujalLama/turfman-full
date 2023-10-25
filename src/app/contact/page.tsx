import PageHeader, { IPageHeader } from "@/section/PageHeader";
import ContactForm from "@/forms/ContactForm";
import SideContactBlock, { IContactBlock } from "@/section/SideContactBlock";
import GoogleMap from "@/components/GoogleMap";
import PlainContent, { IPlainContent } from "@/section/PlainContent";
import { contactData } from "@/data/contactData";

export default function Page() {
  return (
    <main>
      {
        contactData.sections.map(section => {
          if(section.name === "pageHeader") {
            return <PageHeader key={section.name} data={section.content as IPageHeader} />
          }
        })
      }
      
      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <div className="my-25 large:flex large:-mx-7.5">
            {
              contactData.sections.map(section => {
                if(section.name === "contactForm") {
                  return <ContactForm key={section.name} />
                }
              })
            }
            

            {/* <!--company contact details--> */}
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
