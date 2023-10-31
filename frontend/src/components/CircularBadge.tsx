
import AnimatedCounter from './AnimatedCounter'


export interface ICircularBadge {
  title: number;
  desc: string;
}

export default function CircularBadge({data}: {data: ICircularBadge}) {
  return (
    <div className="sm:w-[145px] sm:h-[145px] sm:border sm:border-dashed sm:border-[#aaa] sm:rounded-full sm:flex sm:flex-col sm:items-center sm:justify-center">
        <h3 className="text-[12px] text-primary font-bold tracking-[1px] leading-[1.2] mb-[5px] uppercase">
            <span>{data.desc}</span></h3>
        <h4 className="font-bold text-[36px] leading-none text-gray-darker">
          <AnimatedCounter key={data.title} endValue={data.title} />
        </h4>		
    </div>
  )
}
