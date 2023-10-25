import CircularBadge, { ICircularBadge } from "@/components/CircularBadge";
import ContentHeader from "@/components/ContentHeader";
import Gallery, { IGallery } from "@/components/Gallery";
import Wysiwyg from "@/components/Wysiwyg";
import ContentIcon, { IcontentIcon } from "@/layouts/ContentIcon";


export interface IMainContent {
    title: string;
    subTitle: string;
    wysiwyg: string;
    gallery: IGallery[]
    contentIcon: IcontentIcon[]
    badge: ICircularBadge
}

export default function MainContent({data}: {data: IMainContent}) {
  return (
    <section className="px-7.5 my-25 mx-auto xl:px-3.5 xl:max-w-[1200px]">
        <div className="large:flex large:items-center">
            <div className="large:w-1/2 large:mr-14">
                <ContentHeader data={{title: data.title, subTitle: data.subTitle}} />
                <Wysiwyg content={data.wysiwyg} />
                <ContentIcon data={data.contentIcon} />
            </div>

            <div className="relative large:w-1/2">
                <Gallery data={data.gallery} />
                <div className="hidden sm:absolute sm:top-1/2 sm:left-1/2 sm:-translate-y-1/2 sm:-translate-x-1/2 bg-white shadow-lg sm:w-[165px] sm:h-[165px] sm:rounded-full sm:flex sm:items-center sm:justify-center">
                    <CircularBadge data={data.badge} />
                </div>
            </div>
        </div>
    </section>
  )
}
