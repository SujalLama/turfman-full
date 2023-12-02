import { API_URL, MONTH_NAMES } from "@/api/constants";
import BlogList from "@/layouts/BlogList";
import { formatImage } from "@/utils/dataFormatter";

export interface IRelatedBlogs {
    title: string;
    blogId: number;
    categoryId: number;
}

async function getRelatedPosts(blogId: number, categoryId: number) {
  const url = API_URL + `/posts?populate[0]=post_category&filters[post_category][id][$eq]=${categoryId}&filters[id][$ne]=${blogId}&fields[0]=title&fields[1]=slug&populate[1]=cover&pagination[pageSize]=4&fields[2]=updatedAt`;
  
  const {data} = await fetch(url, {next: {revalidate: 3600}}).then(res => res.json());

  if(!data) {
    return []
  };

  return formatRelatedBlogs(data)
}

function formatRelatedBlogs(data: any[]) {
  const newData = data.map(item => {
    const {title, slug, cover, updatedAt, post_category} = item?.attributes

    let coverImg = {src: "", alt: ""};
    let date = '';
    let category = {id: 0, name: "", slug: ""};

    if(cover?.data) {
      coverImg = formatImage('small', cover?.data);
    }

    if(updatedAt) {
      const newDate = new Date(updatedAt);


      date = `${newDate.getDate()} ${MONTH_NAMES[newDate.getMonth()]}, ${newDate.getFullYear()}`
    }

    if(post_category?.data) {
      category.id = post_category?.data?.id;
      category.name = post_category?.data?.attributes?.name;
      category.slug = post_category?.data?.attributes?.slug;
    }

    return {
      id: item.id,
      title,
      slug,
      coverImg,
      date,
      category
    }
  
  })
  return newData;
}
  
export default async function RelatedBlogPost({data}: {data: IRelatedBlogs}) {
  const blogs = await getRelatedPosts(data.blogId, data.categoryId);

  return (
    <section className="mt-14 mb-10">
        <h2 className="font-bold text-[36px] mb-5 text-gray-darker">{data.title}</h2>

        <div className="md:flex md:flex-wrap md:justify-between md:-mx-2">
            <BlogList blogs={blogs} className="mb-8 md:w-[calc(50%_-_2rem)] md:mx-4" />
        </div>
    </section>
  )
}
