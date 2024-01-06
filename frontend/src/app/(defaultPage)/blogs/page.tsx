import { SITE_URL } from "@/api/constants"
import ImgLink, { IImgLinkProps } from "@/components/ImgLink"
import { blogData } from "@/data/blogData"
import SearchForm from "@/forms/SearchForm"
import ImgListView, { IImgListViewProps } from "@/layouts/ImgListView"
import PageBlogs from "@/section/PageBlogs"
import PageHero, { IPageHero } from "@/section/PageHero"
import { Metadata } from "next"

export const metadata: Metadata = {
    title: 'Blog - The Turfman Perth',
    openGraph: {
        images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"],
        type: "article",
        url: `${SITE_URL}/blogs`,
        title: "Blog",
        locale: "en_US",
        siteName: "The Turfman Perth",
    },
    twitter: {
        images: ["https://theturfman.com.au/wp-content/uploads/2021/07/The-Turf-Man.png"]
    }
}

export default function page() {
  return (
    <main>
         <PageHero 
                data={{
                        bgImg: {
                            src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
                            alt: 'page hero'
                        },
                        title: 'Blogs'
                    }} 
        />;
        
      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <div className="my-25 large:flex large:justify-between large:items-stretch large:-mx-3.5">
            {
                blogData.sections.map(section => {
                    if(section.name === "blogList") {
                        return <PageBlogs key={section.name} />;
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
                                
                                return <ImgListView key={section.name} {...{title: section.title, path: section.path, lists: section.content} as IImgListViewProps}  />
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
