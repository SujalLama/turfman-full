
const sectionHeaderData = {
    subtitle: "why choose us",
    title: 'Why Choosing "The Truf Man"',
    desc: ""
}

export default function SectionHeader() {
  return (
    <header className="text-center mb-[80px]">
        <p className="text-sm text-primary font-bold tracking-[2px] leading-[24px] mb-[5px] uppercase">
            {sectionHeaderData.subtitle}
        </p>
        <h2 className="font-bold text-[25px] md:text-3xl leading-[1.4] large:leading-[1.3] large:text-[35px] xl:text-[40px] mb-2.5 text-gray-darker">
            {sectionHeaderData.title}
        </h2>
        {
            sectionHeaderData.desc && <p>{sectionHeaderData.desc}</p>
        }
    </header>
  )
}
