import ImgListCard, { IImgListCardProps } from '@/components/ImgListCard';
import React from 'react'

interface IImgListViewProps {
    title: string;
    lists: IImgListCardProps[]
}


function ImgListView({title, lists}: IImgListViewProps) {
  return (
    <div className="pt-[35px] text-gray-darker pb-5 md:flex-shrink-0 md:flex-grow-0">
        <h2 
            className="text-[22px] leading-tight font-bold pb-3.5 mb-[35px] border-b 
            border-black/10 relative after:content-[''] after:absolute after:left-0 
            after:bottom-0 after:w-7.5 after:h-[3px] after:-mb-[2px] after:bg-primary">
                {title}
        </h2>
        <div className="text-sm font-bold">
            {
                lists.map(listItem => {
                    return <ImgListCard key={listItem.title} {...listItem} />
                })
            }
        </div>    							
    </div>
  )
}

export default ImgListView