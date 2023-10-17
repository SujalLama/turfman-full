
const contentHeaderContent = {
    subTitle: 'Who we are',
    title: 'The Turf Man Provides Reliable Quality Turf'
}

export default function ContentHeader() {
  return (
    <header className="mb-7.5">
        <p className="text-sm text-primary font-bold tracking-[2px] leading-[1.2] mb-[5px] uppercase">
            {contentHeaderContent.subTitle}
        </p>
        <h2 className="font-bold text-[25px] md:text-3xl leading-[1.4] large:leading-[1.3] large:text-[35px] xl:text-[40px] mb-2.5 text-gray-darker">
            {contentHeaderContent.title}
        </h2>
    </header>
  )
}
