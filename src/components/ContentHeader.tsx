
const contentHeaderContent = {
    subTitle: 'Who we are',
    title: 'The Turf Man Provides Reliable Quality Turf'
}

export default function ContentHeader() {
  return (
    <div className="mb-7.5">
        <h4 className="text-sm text-primary font-bold tracking-[2px] leading-[1.2] mb-[5px] uppercase">
            {contentHeaderContent.subTitle}
        </h4>
        <h2 className="font-bold text-[25px] md:text-3xl leading-[1.4] large:leading-[1.3] large:text-[35px] xl:text-[40px] mb-2.5 text-gray-darker">
            {contentHeaderContent.title}
        </h2>
    </div>
  )
}
