

import { IBlogCardItem } from "@/components/BlogCardItem"
import ImgLink, { IImgLinkProps } from "@/components/ImgLink"
import { IImgListCardProps } from "@/components/ImgListCard"
import { blogData } from "@/data/blogData"
import SearchForm from "@/forms/SearchForm"
import ImgListView from "@/layouts/ImgListView"
import PageBlogs from "@/section/PageBlogs"
import PageHero, { IPageHero } from "@/section/PageHero"

export default function page() {
  return (
    <main>
        {
            blogData.sections.map(section => {
                if(section.name === "pageHero") {
                    return <PageHero key={section.name}  data={section.content as IPageHero} />;
                }
            })
        }
      
      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <div className="my-25 large:flex large:justify-between large:items-start large:-mx-3.5">
            {
                blogData.sections.map(section => {
                    if(section.name === "blogList") {
                        return <PageBlogs key={section.name} /> ;
                    }
                })
            }
            

            <aside className="large:w-[33%] large:px-3.5">
                <div className="bg-[#f7f9fa] p-6 md:p-10 rounded-[5px]">
                    {
                        blogData.sections.map(section =>{
                            if(section.name === "searchForm") {
                                return <SearchForm key={section.name} />
                            }

                            if(section.name === "imgList") {
                                
                                return <ImgListView key={section.name} title="Other Options Available" lists={section.content as IImgListCardProps[]} />
                            }

                            if(section.name === "imgLink") {
                                return <ImgLink key={section.name} data={section.content as IImgLinkProps} />
                            }
                            
                        })
                    }
                  
                </div>
            </aside>
          </div>
      </section>
    </main>
  )
}
