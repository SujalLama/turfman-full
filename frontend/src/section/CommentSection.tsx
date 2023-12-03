'use client';

import { API_URL } from "@/api/constants";
import FaIcons from "@/components/FaIcons";
import Button from "@/components/forms/Button";
import CommentForm from "@/forms/CommentForm";
import QueryProvider from "@/providers/QueryProvider";
import { formatDate } from "@/utils/dataFormatter";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

async function getComments(blogId:number) {
  const url = API_URL + `/comments/api::post.post:${blogId}`;
  const {data} = await axios.get(url);

  return data;
}

interface IComment {
  id: number;
  author: string;
  content: string;
  date: string;
  children: any[];
}


export default function CommentSection({blogId, blogName}: {blogId: number; blogName: string;}) {
  const [newCommentId, setNewCommentId] = useState<number | null>(0);

  return (
    <QueryProvider>
    <div>
      <AllComments blogId={blogId} blogName={blogName} newCommentId={newCommentId} setNewCommentId={setNewCommentId} />

      <section className="mb-10 md:mb-0">

          <h2 className="text-xl mb-2 text-gray-darker font-bold">Leave a Reply</h2>
          
          <p className="mb-8">Your email address will not be published. Required fields are marked *</p>

          <CommentForm postId={blogId}  refetch={(id: number | null) => setNewCommentId(id)} />
      </section>
    </div>
    </QueryProvider>
  )
}

function AllComments ({blogId, blogName, newCommentId, setNewCommentId} : {blogId: number, blogName: string; newCommentId: number | null, setNewCommentId : Dispatch<SetStateAction<number | null>>}) {
  
  const {data, isPending} = useQuery({queryKey: ["comments", newCommentId], queryFn: () => getComments(blogId)});

  if(isPending || data.length == 0) return null;


  return (
    <div className="my-20">
      <h2 className="text-xl mb-8 text-gray-darker font-bold">Replies to ({blogName})</h2>
      {
          data.length > 0 && data.map((comment: any) => {
            return (
                <CommentBlock key={comment.id} comment={comment} blogId={blogId} refetch={(id: number | null) => setNewCommentId(id)} />
            )
          })
        }
      
    </div>
  )
}



function CommentBlock({comment, blogId, refetch}: {comment: any, blogId: number, refetch: (id: number | null) => void}) {
  const [openComment, setOpenComment] = useState(false);

  return (
    <div>
      <div className="mb-6 pb-6 border-b " key={comment.id} >
        <div className="flex items-start gap-4 md:gap-8" >
          <div className="w-10 h-10 flex items-center justify-center bg-gray-400 rounded-full">
            <FaIcons icon="faUser" className="text-3xl text-white" />
          </div>
          <div className="flex-1">
            <h3 className="text-black font-semibold">{comment?.author?.name}</h3>
            <span className="text-sm text-primary">{formatDate(comment.updatedAt)}</span>
            <p className="mt-2">{comment.content} </p>
          </div>
          <Button name="REPLY" className="!w-auto !px-3 !py-1 h-auto text-sm font-semibold" onClick={() => setOpenComment(true)}/>
        </div>

        {
        openComment && (
        <div className="my-6">
          <div className="flex gap-8 items-start">
            <h2 className="text-xl flex-1 mb-8 text-gray-darker font-bold">Reply to Comment</h2>
            <Button name="Cancel Reply" className="!w-auto !px-3 !py-1 h-auto text-sm font-semibold" onClick={() => setOpenComment(false)} />
          </div>
          <CommentForm postId={blogId} commentId={comment.id} refetch={refetch} />
        </div>
        )
      }
      </div>

      
        {
          (comment.children.length > 0) && comment.children.map((child: any) => <div className="ml-2 md:ml-6" key={child.id}>
            <CommentBlock key={child.id} comment={child} blogId={blogId} refetch={refetch} />
          </div>)
        }
    </div>
  )
}