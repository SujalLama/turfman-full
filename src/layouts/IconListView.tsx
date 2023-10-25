import IconCard from "@/components/IconCard"

export interface IIcon {
    icon: string;
    desc: number;
    label: string;
}

export default function IconListView({data}: {data: IIcon[]}) {
  return (
    <section className="my-25 px-7.5 sm:mx-auto sm:max-w-[540px] md:max-w-[720px] xl:px-3.5 large:max-w-[960px] xl:max-w-[1200px]">
        <div className="my-12 border-t border-[#e7e7e7] ">
            <div className="md:flex md:flex-wrap large:justify-between">
                {
                    data.map((iconListItem, i) => {
                        const count = i + 1;

                        const className = [
                            'md:justify-center large:justify-start xl:justify-center md:border-l md:border-[#e7e7e7] large:border-l-0 xl:border-l xl:border-[#e7e7e7]',
                            '',
                            'md:justify-center md:border-l md:border-[#e7e7e7]',
                            'large:justify-center large:border-l large:border-[#e7e7e7]'
                        ]
                        
                        return (
                            <IconCard key={iconListItem.desc} data={iconListItem} className={className[count % 4]} />
                        )
                    })
                }
            </div>
        </div>
    </section>
  )
}
