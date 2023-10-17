import BlogList from "@/section/BlogList";
import CTASection from "@/section/CTASection";
import Feature from "@/section/Feature";
import Hero from "@/section/Hero";
import InfoCard from "@/section/InfoCard";
import MainContent from "@/section/MainContent";
import Testimonial from "@/section/Testimonial";
import WhySection from "@/section/WhySection";

export default function Home() {
  return (
    <main>
      <Hero />
      <Feature />
      <MainContent />
      <Testimonial />
      <InfoCard />
      <WhySection />
      <CTASection />
      <BlogList />
    </main>
  )
}
