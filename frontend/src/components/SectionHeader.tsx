

interface ISectionHeader {
    subTitle: string;
    title: string;
    desc?: string;
}

export default function SectionHeader({data} : {data: ISectionHeader}) {
  return (
    <header className="text-center mb-[80px]">
        <p className="text-sm text-primary font-bold tracking-[2px] leading-[24px] mb-[5px] uppercase">
            {data.subTitle}
        </p>
        <h2 className="font-bold text-[25px] md:text-3xl leading-[1.4] large:leading-[1.3] large:text-[35px] xl:text-[40px] mb-2.5 text-gray-darker">
            {data.title}
        </h2>
        {
            data.desc && <p className="text-lg font-display leading-[1.4] max-w-[800px] mx-auto">{data.desc}</p>
        }
    </header>
  )
}
