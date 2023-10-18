import BlogList from "@/layouts/BlogList";
const blogs = [
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
  
export default function RelatedBlogPost({title}: {title: string;}) {
  return (
    <section className="mt-14 mb-10">
        <h2 className="font-bold text-[36px] mb-5 text-gray-darker">{title}</h2>

        <div className="md:flex md:flex-wrap md:justify-between md:-mx-2">
            <BlogList blogs={blogs} className="mb-8 md:w-[calc(50%_-_2rem)] md:mx-4" />
        </div>
    </section>
  )
}
