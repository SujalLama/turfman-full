import BlogCardItem, { IBlogCardItem } from '@/components/BlogCardItem'
import Pagination from '@/components/Pagination'

export default function PageBlogs({data}: {data: IBlogCardItem[]}) {
  return (
    <div className="mb-20 md:-mx-4 large:w-[67%] large:px-3.5">
        <div className="md:flex md:items-start md:flex-wrap ">
        {
            data.map(blog => {
                return <BlogCardItem key={blog.id} data={blog} />
            })
        }
        </div>
    
        {/* <Pagination /> */}
    </div>
  )
}
