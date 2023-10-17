
interface IProgressBar {
    label: string;
    percent: number;
}
export default function ProgressBar({label, percent} : IProgressBar) {
  return (
    <div className="pb-8">
        <div className="flex justify-between mb-2">
            <span className="font-bold text-[15px]">{label}</span>
            <span className="font-bold text-[15px] text-gray-darker">{percent}%</span>
        </div>
        <div className="relative">
            {/* <!--Background line--> */}
            <div className="absolute top-0 h-[7px] w-full bg-black/10"></div>
            {/* <!--Front line--> */}
            <div className="absolute top-0 h-[7px] bg-primary after:content-[''] 
                after:block after:absolute after:-top-[4px] after:right-0 after:border-[3px] 
                after:border-primary after:w-3.5 after:h-3.5 after:rounded-full after:bg-white" style={{width: `${percent}%`}}></div>
            {/* <!--Pointer--> */}
            
        </div>
    </div>
  )
}
