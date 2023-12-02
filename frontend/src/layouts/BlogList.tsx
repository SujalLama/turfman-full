import BlogCard from "@/components/BlogCard"
import { IBlogCardItem } from "@/components/BlogCardItem";

export default function BlogList({blogs, className} : {blogs: IBlogCardItem[], className?: string;}) {
  return (
    <>
        {
            blogs.map(blog => {
                return (
                    <div key={blog.id} className={`group ${className ? className : ''}`}>
                        <BlogCard data={blog} />
                    </div>)
            })
        }
  </>  
  )
}
