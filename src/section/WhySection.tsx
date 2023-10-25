import SectionHeader from "@/components/SectionHeader";
import IconGridView, { IIconGridView } from "@/layouts/IconGridView";

const sectionHeaderData = {
    subTitle: "why choose us",
    title: 'Why Choosing "The Truf Man"',
    desc: ""
}
export interface IWhy {
  subTitle: string;
  title: string;
  desc: string;
  iconGridView: IIconGridView[];
}
export default function WhySection({data}: {data: IWhy}) {
  return (
    <section className="px-7.5 my-25  relative z-10 mx-auto xl:px-3.5 xl:max-w-[1200px]">
        <SectionHeader data={{title: data.title, subTitle: data.subTitle, desc: data?.desc}} />
        <IconGridView data={data.iconGridView} />
    </section>
  )
}
