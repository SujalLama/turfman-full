import FaIcons from "./FaIcons";

async function getComments(id: number) {
    const URL = process.env.NEXT_PUBLIC_API_BASE_URL + `/comments/api::post.post:${id}/flat?pagination[page]=1&pagination[pageSize]=100&pagination[withCount]=true`
    const {meta} = await fetch(URL, { cache: 'no-store' }).then((res) => res.json());

    if(!meta?.pagination?.total) {
      return 0;
    }

  
    return meta?.pagination?.total
  }

export default async function Comments({commentId}: {commentId: number}) {
    const comments = await getComments(commentId);

  return (
    <>
    <FaIcons icon="faComments" className="text-primary mr-1" />
    <span>{comments == 0 ? 'No' : comments} Comments</span>
    </>
  )
}
