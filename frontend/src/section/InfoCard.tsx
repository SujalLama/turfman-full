import FaIcons from "@/components/FaIcons";
import Image from "next/image";

export interface IInfoCard {
    img: {src: string; alt: string;};
    title: string;
    subTitle: string;
}

export default function InfoCard({data}: {data: IInfoCard}) {
  return (
    <section className="px-7.5 -mt-[80px] mb-[160px] sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  relative z-10 mx-auto xl:px-3.5 xl:max-w-[1200px]">
        <div className="md:flex bg-white rounded-[5px] shadow-md relative">
            <div className="h-[200px]  w-full md:w-[230px] md:h-[214px] large:w-[310px] xl:h-[182px] xl:w-[390px] shrink-0  relative">
                <Image 
                    src={data.img.src}
                    alt={data.img.alt}
                    className="rounded-t-[5px] md:rounded-tr-none md:rounded-l-[5px] w-full h-full object-cover object-center"
                    fill
                />
            </div>
            <div className="px-5 py-10 md:pr-3.5 md:pl-[80px]">
                <h3 className="text-gray-text text-[25px] leading-[1.3] font-light mb-2.5">
                    {data.title}
                </h3>
                <p className="text-[32px] text-gray-darker  font-semibold">
                    {data.subTitle}
                 </p>
            </div>
            <div className="hidden md:flex w-[6em] h-[6em] border-[10px] bg-primary border-white rounded-full items-center justify-center absolute top-1/2 md:left-[190px] large:left-[270px] xl:left-[350px] -translate-y-1/2">
                <FaIcons icon="faPhoneVolume" className="text-3xl text-white" />
            </div>
        </div>
    </section>
  )
}
