import BlogCard from "@/components/BlogCard"
import SectionHeader from "@/components/SectionHeader"

const blogListData = {
    subTitle: 'BLOGS & NEWS',
    title: 'What’s new and what should know about turf',
    desc: "Let's understand most with variety and different need to solved with different purpose of need. Understand more about turfing, purchasing, ordering and selling.",
    blogs: [
        {
            id: "3434uhd",
            title: 'Quick Winter Lawn Care Tips',
            img: {
                src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
                alt: "winter lawn",
            },
            category: 'turf',
            link: "/blogs/lawn-tips",
            comments: 0,
            date: "07 Jun, 2022"
        },
        {
            id: "3434snadd",
            title: 'Tips to Pet Friendly Lawn',
            img: {
                src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
                alt: "Dog",
            },
            category: 'turf',
            link: "/blogs/lawn-tips",
            comments: 10,
            date: "30 Apr, 2022"
        },
        {
            id: "343903hd",
            title: 'Benefits of Fertilising Your Lawn',
            img: {
                src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
                alt: "Grass",
            },
            category: 'uncategorized',
            link: "/blogs/lawn-tips",
            comments: 11,
            date: "08 Feb, 2022"
        },
    ]
}

export default function BlogList() {
  return (
    <section className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            <SectionHeader 
                data={
                    {title: blogListData.title, subTitle: blogListData.subTitle, desc: blogListData.desc}
                } 
            />

        <div className="md:flex md:flex-wrap md:justify-between md:-mx-2">
            {
                blogListData.blogs.map(blog => {
                    return <BlogCard key={blog.id} data={blog} />
                })
            }
            
        </div>
    </section>
  )
}
