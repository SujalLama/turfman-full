import Wysiwyg from "@/components/Wysiwyg";
import BlogContentHeader, { IBlogContentHeader } from "./BlogContentHeader";

export interface ISingleBlog {
    blogHeader: IBlogContentHeader;
    wysiwyg: string;
}

export default function SingleBlog({data}: {data: ISingleBlog}) {
  return (
    <>
        <BlogContentHeader {...data.blogHeader} />
        <Wysiwyg className="my-8" content={data.wysiwyg} />
    </>
  )
}
