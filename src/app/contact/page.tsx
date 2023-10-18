import PageHeader from "@/section/PageHeader";
import ContactForm from "@/forms/ContactForm";
import SideContactBlock from "@/section/SideContactBlock";
import GoogleMap from "@/components/GoogleMap";
import Testimonial from "@/section/Testimonial";
import PlainContent from "@/section/PlainContent";

const contactData = {
  title: 'Contact Us',
  desc: `Contact Us, Whether you have a question<a href="https://theturfman.com.au/about-us/"> about</a> features, pricing, need a demo, or anything else, our team is ready to answer all your questions. Have a question? Concern? Request?&nbsp; Contact us through the following ways. We’d love to hear from you. Please submit your request and The Turf Man representative will contact you as quickly as possible. <strong>How Can We Help? </strong>Please select a topic below related to your inquiry. If you don’t find what you need, fill out our contact form. <strong>Book a Demo, </strong>Request a demo from one of our conversion specialists.`
}



export default function Page() {
  return (
    <main>
      <PageHeader title={contactData.title} desc={contactData.desc} />
      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <div className="my-25 large:flex large:-mx-7.5">
            <ContactForm />

            {/* <!--company contact details--> */}
            <div className="my-25 large:mx-0 large:w-2/5 large:px-7.5">
                <SideContactBlock />
                <GoogleMap />
            </div>
        </div>
      </section>

      <section>
        <PlainContent />
      </section>
    </main>
  )
}
