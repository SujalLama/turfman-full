import BlogCard, { IBlogCard } from "@/components/BlogCard"

export default function BlogList({blogs, className} : {blogs: IBlogCard[], className?: string;}) {
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
