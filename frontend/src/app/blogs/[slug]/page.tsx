import ImgLink, { IImgLinkProps } from "@/components/ImgLink";
import SearchForm from "@/forms/SearchForm";
import ImgListView from "@/layouts/ImgListView";
import PageHero, { IPageHero } from "@/section/PageHero";
import SocialIcons, { ISocialIcons } from "@/components/SocialIcons";
import RelatedBlogPost, { IRelatedBlogs } from "@/section/RelatedBlogPost";
import { singleBlogData } from "@/data/singleBlogData";
import SingleBlog from "@/section/SingleBlog";
import CommentSection from "@/section/CommentSection";
import { formatPost } from "@/utils/dataFormatter";
import ErrorComponent from "@/components/ErrorComponent";

export async function generateStaticParams() {
  try {
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + '/posts?fields[0]=slug'
    const {data} = await fetch(url, { cache: 'no-store' }).then((res) => res.json());
  
    if(!data) {
      return [{slug: '0'}]
    }
   
    return data?.map((item : {attributes: {slug: string;}}) => ({
      slug: item?.attributes?.slug,
    })) 

  } catch(error) {
    return [{slug: '0'}]
  }

}

async function getBlogData (slug: string) {
  try {
    const query = `?filters[slug][$eq]=${slug}`+
                   '&populate[1]=cover'+
                   "&populate[2]=post_category";
                   
   
    const url = process.env.NEXT_PUBLIC_API_BASE_URL + `/posts${query}`
    const {data} = await fetch(url, {cache: 'no-store'}).then((res) => res.json());
   
     if(!data) {
      return null;
     }
   
     return formatPost(data[0]);
  } catch(error) {
    return null;
  }
}

export default async function page({params}: {params: {slug: string;}}) {
  const post = await getBlogData(params.slug);
  

  if(!post) {
    return (
        <ErrorComponent />
    );
  }

  return (
    <main>
      {
        singleBlogData.sections.map(section => {
          if(section.name === "pageHero") {
            return <PageHero key={section.name}  data={{title: post.title, bgImg: post.coverImg}} />
          }
        })
      }
      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <div className="my-25 large:flex large:justify-between large:items-start large:-mx-3.5">
            <div className="mb-20 large:w-[67%] large:px-3.5">
              <SingleBlog data={
                {
                  id: post.id,
                  img: post.coverImg,
                  category: post.category,
                  link: post.slug,
                  date: post.date,
                  author: 'turfman',
                  body: post.body,
                }
              }
              />
              {
                singleBlogData.sections.map(section => {
                  if(section.name === "socials") {
                    return  <SocialIcons key={section.name} data={section.content as ISocialIcons[]} className="pt-8 border-t border-black/10" />
                  }
                  if(section.name === "relatedBlogs") {
                    return <RelatedBlogPost key={section.name} data={{...section.content, blogId: post.id, categoryId: post.category.id} as IRelatedBlogs} />
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
                                
                                return <ImgListView key={section.name} title={section.title} path={section.path} />
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
