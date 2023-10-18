interface IPageHeader {
    title: string;
    desc: string;
}

export default function PageHeader({title, desc}: IPageHeader) {
  return (
    <section className="mb-25 mt-8 md:mt-16 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <h1 className="text-[45px] md:text-center font-semibold mb-5 text-primary">
          {title}
        </h1>
        <p dangerouslySetInnerHTML={{__html: desc}}></p>
    </section>
  )
}
