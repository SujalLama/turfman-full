import SectionHeader from "@/components/SectionHeader";
import IconGridView from "@/layouts/IconGridView";

const sectionHeaderData = {
    subtitle: "why choose us",
    title: 'Why Choosing "The Truf Man"',
    desc: ""
}

export default function WhySection() {
  return (
    <section className="px-7.5 my-25  relative z-10 mx-auto xl:px-3.5 xl:max-w-[1200px]">
        <SectionHeader data={sectionHeaderData} />
        <IconGridView />
    </section>
  )
}
