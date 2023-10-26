import ImgLink, { IImgLinkProps } from "@/components/ImgLink";
import SearchForm from "@/forms/SearchForm";
import ImgListView from "@/layouts/ImgListView";
import PageHero, { IPageHero } from "@/section/PageHero";
import SocialIcons, { ISocialIcons } from "@/components/SocialIcons";
import RelatedBlogPost, { IRelatedBlogs } from "@/section/RelatedBlogPost";
import { IImgListCardProps } from "@/components/ImgListCard";
import { singleBlogData } from "@/data/singleBlogData";
import SingleBlog, { ISingleBlog } from "@/section/SingleBlog";
import CommentSection from "@/section/CommentSection";

export default function page() {
  return (
    <main>
      {
        singleBlogData.sections.map(section => {
          if(section.name === "pageHero") {
            return <PageHero key={section.name}  data={section.content as IPageHero} />
          }
        })
      }
      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <div className="my-25 large:flex large:justify-between large:items-start large:-mx-3.5">
            <div className="mb-20 large:w-[67%] large:px-3.5">
              {
                singleBlogData.sections.map(section => {
                  if(section.name === "blog") {
                    return <SingleBlog key={section.name} data={section.content as ISingleBlog} />;
                  }
                  if(section.name === "socials") {
                    return  <SocialIcons key={section.name} data={section.content as ISocialIcons[]} className="pt-8 border-t border-black/10" />
                  }
                  if(section.name === "relatedBlogs") {
                    return <RelatedBlogPost key={section.name} data={section.content as IRelatedBlogs} />
                  }
                  if(section.name === "commentForm"){
                    return <CommentSection key={section.name} />
                  }
                })
              }
                
            </div>

            <aside className="large:w-[33%] large:px-3.5">
                <div className="bg-[#f7f9fa] p-6 md:p-10 rounded-[5px]">
                  {
                        singleBlogData.sections.map(section =>{
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
