import BlogCardItem from "@/components/BlogCardItem"
import ImgLink from "@/components/ImgLink"
import Pagination from "@/components/Pagination"
import SearchForm from "@/forms/SearchForm"
import ImgListView from "@/layouts/ImgListView"
import PageHero from "@/section/PageHero"

const pageHeroData = {
  bgImg: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
      alt: 'page hero'
  },
  title: 'Blogs'
}

export const imgLinkData = {
  img: {
      src: "https://theturfman.com.au/wp-content/uploads/2020/10/commercial-turf-theturfman.jpeg",
      alt: "best-commercial-lawn"
  },
  link: {
      path: "/contact",
      target: "_blank"
  }
}

export const data = [
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
  },
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
  },
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
  },
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
  },
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
  },
]
export const data2 = [
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
      desc: "$7.00 per bag",
      alignImg: "right"
  },
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
      desc: "$7.00 per bag",
      alignImg: "right"
  },
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
      desc: "$7.00 per bag",
      alignImg: "right"
  },
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
      desc: "$7.00 per bag",
      alignImg: "right"
  },
  {
      img: {
          src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care-150x150.jpg",
          alt: "winter lawn"
      },
      link: "/blogs/indf",
      title: "Quick Winter Lawn Care Tips",
      desc: "$7.00 per bag",
      alignImg: "right"
  },
]

const blogListData = {
  subTitle: 'BLOGS & NEWS',
  title: 'What’s new and what should know about turf',
  desc: "Let's understand most with variety and different need to solved with different purpose of need. Understand more about turfing, purchasing, ordering and selling.",
  blogs: [
      {
          id: "343dfdfuhd",
          title: 'Quick Winter Lawn Care Tips',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
              alt: "winter lawn",
          },
          category: 'turf',
          link: "/blogs/lawn-tips",
          comments: 0,
          date: "07 Jun, 2022",
          author: "turfman",
      },
      {
          id: "3434snadd394",
          title: 'Tips to Pet Friendly Lawn',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
              alt: "Dog",
          },
          category: 'turf',
          link: "/blogs/lawn-tips",
          comments: 10,
          date: "30 Apr, 2022",
          author: "turfman",
      },
      {
          id: "343903hd030",
          title: 'Benefits of Fertilising Your Lawn',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
              alt: "Grass",
          },
          category: 'uncategorized',
          link: "/blogs/lawn-tips",
          comments: 11,
          date: "08 Feb, 2022",
          author: "turfman",
      },
      {
          id: "343dfdfuhd",
          title: 'Quick Winter Lawn Care Tips',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
              alt: "winter lawn",
          },
          category: 'turf',
          link: "/blogs/lawn-tips",
          comments: 0,
          date: "07 Jun, 2022",
          author: "turfman",
      },
      {
          id: "3434snadd394",
          title: 'Tips to Pet Friendly Lawn',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
              alt: "Dog",
          },
          category: 'turf',
          link: "/blogs/lawn-tips",
          comments: 10,
          date: "30 Apr, 2022",
          author: "turfman",
      },
      {
          id: "343903hd030",
          title: 'Benefits of Fertilising Your Lawn',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
              alt: "Grass",
          },
          category: 'uncategorized',
          link: "/blogs/lawn-tips",
          comments: 11,
          date: "08 Feb, 2022",
          author: "turfman",
      },
      {
          id: "343dfdfuhd",
          title: 'Quick Winter Lawn Care Tips',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
              alt: "winter lawn",
          },
          category: 'turf',
          link: "/blogs/lawn-tips",
          comments: 0,
          date: "07 Jun, 2022",
          author: "turfman",
      },
      {
          id: "3434snadd394",
          title: 'Tips to Pet Friendly Lawn',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
              alt: "Dog",
          },
          category: 'turf',
          link: "/blogs/lawn-tips",
          comments: 10,
          date: "30 Apr, 2022",
          author: "turfman",
      },
      {
          id: "343903hd030",
          title: 'Benefits of Fertilising Your Lawn',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
              alt: "Grass",
          },
          category: 'uncategorized',
          link: "/blogs/lawn-tips",
          comments: 11,
          date: "08 Feb, 2022",
          author: "turfman",
      },
      {
          id: "343dfdfuhd",
          title: 'Quick Winter Lawn Care Tips',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg",
              alt: "winter lawn",
          },
          category: 'turf',
          link: "/blogs/lawn-tips",
          comments: 0,
          date: "07 Jun, 2022",
          author: "turfman",
      },
      {
          id: "3434snadd394",
          title: 'Tips to Pet Friendly Lawn',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/04/pet-friendly-lawncare-2-770x500.jpg",
              alt: "Dog",
          },
          category: 'turf',
          link: "/blogs/lawn-tips",
          comments: 10,
          date: "30 Apr, 2022",
          author: "turfman",
      },
      {
          id: "343903hd030",
          title: 'Benefits of Fertilising Your Lawn',
          img: {
              src: "https://theturfman.com.au/wp-content/uploads/2022/02/lawn-fertilising-benefits-770x480.jpg",
              alt: "Grass",
          },
          category: 'uncategorized',
          link: "/blogs/lawn-tips",
          comments: 11,
          date: "08 Feb, 2022",
          author: "turfman",
      },
  ]
}

export default function page() {
  return (
    <main>
      <PageHero  data={pageHeroData} />
      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <div className="my-25 large:flex large:justify-between large:items-start large:-mx-3.5">
            <div className="mb-20 md:-mx-4 large:w-[67%] large:px-3.5">
              <div className="md:flex md:items-start md:flex-wrap ">
                {
                  blogListData.blogs.map(blog => {
                    return <BlogCardItem key={blog.id} data={blog} />
                  })
                }
                </div>
            
              <Pagination />
            </div>

            <aside className="large:w-[33%] large:px-3.5">
                <div className="bg-[#f7f9fa] p-6 md:p-10 rounded-[5px]">
                  <SearchForm />
                  <ImgListView title="Other Options Available" lists={data} />
                  <ImgListView title="Products" lists={data2} />
                  <ImgLink {...imgLinkData} />
                </div>
            </aside>
          </div>
      </section>
    </main>
  )
}
