import { IBlogCard } from "@/components/BlogCard";
import BlogList from "@/layouts/BlogList";

export interface IRelatedBlogs {
    title: string;
    blogs: IBlogCard[]
}
  
export default function RelatedBlogPost({data}: {data: IRelatedBlogs}) {
  return (
    <section className="mt-14 mb-10">
        <h2 className="font-bold text-[36px] mb-5 text-gray-darker">{data.title}</h2>

        <div className="md:flex md:flex-wrap md:justify-between md:-mx-2">
            <BlogList blogs={data.blogs} className="mb-8 md:w-[calc(50%_-_2rem)] md:mx-4" />
        </div>
    </section>
  )
}
