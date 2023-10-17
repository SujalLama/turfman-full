import CTASection from "@/section/CTASection";
import Feature from "@/section/Feature";
import Hero from "@/section/Hero";
import MainContent from "@/section/MainContent";
import Testimonial from "@/section/Testimonial";

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <MainContent />
      <Testimonial />
      <CTASection />
    </main>
  )
}
