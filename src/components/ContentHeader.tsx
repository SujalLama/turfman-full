
interface IContentHeader {
  subTitle: string;
  title: string;
}

export default function ContentHeader({data}: {data: IContentHeader}) {
  return (
    <header className="mb-7.5">
        <p className="text-sm text-primary font-bold tracking-[2px] leading-[1.2] mb-[5px] uppercase">
            {data.subTitle}
        </p>
        <h2 className="font-bold text-[25px] md:text-3xl leading-[1.4] large:leading-[1.3] large:text-[35px] xl:text-[40px] mb-2.5 text-gray-darker">
            {data.title}
        </h2>
    </header>
  )
}
