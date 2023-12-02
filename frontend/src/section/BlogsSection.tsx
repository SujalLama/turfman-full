import { API_URL } from "@/api/constants";
import BlogCardItem from "@/components/BlogCardItem";
import SectionHeader from "@/components/SectionHeader"
import BlogList from "@/layouts/BlogList"
import { formatPosts } from "@/utils/dataFormatter";

export interface IBlog {
    id: string;
    title: string;
    img: {src: string; alt: string;};
    category: string;
    link: string;
    comments: number;
    date: string;
    author: string;
}

export interface IBlogSection {
    subTitle: string;
    title: string;
    desc: string;
    blogs: IBlog[]
}

export async function getLatestBlogs() {
    const url = API_URL + '/posts?populate[1]=cover&populate[2]=post_category&pagination[pageSize]=3&pagination[page]=1&sort[0]=updatedAt:desc';

    const {data} = await fetch(url, {next: {revalidate: 3600}}).then(res => res.json());

    if(!data) {
        return []
    }

    return formatPosts(data);
}

export default async function BlogsSection({data}: {data: IBlogSection}) {
    const blogs = await getLatestBlogs();

  return (
    <section className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            <SectionHeader 
                data={
                    {title: data.title, subTitle: data.subTitle, desc: data.desc}
                } 
            />

        <div className="md:flex md:flex-wrap md:justify-between md:-mx-2">
            <BlogList blogs={blogs} className="mb-16 md:mb-14 md:w-[calc(33.33%_-_2rem)] md:mx-4"/>
        </div>
    </section>
  )
}
