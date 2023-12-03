"use client";

import { API_URL } from "@/api/constants";
import Button from "@/components/forms/Button";
import CheckboxButton from "@/components/forms/Checkbox";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";
import axios from "axios";
import { ChangeEvent, FormEvent, useState } from "react";

export default function CommentForm({postId, commentId, refetch}: {postId: number; commentId?: number; refetch: (id: number | null) => void}) {
    const [comment, setComment] = useState({name: '', email: '', website: '', message: ''})
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    async function postComment(e: FormEvent) {
        try {
            e.preventDefault();
            setLoading(true);
            setError('');

            

            const url = API_URL + `/comments/api::post.post:${postId}`
            const {name, email, website, message} = comment;

            if(!email || !name || !message) {
                setLoading(false);
                setError('Please provide the required value.');
                return;
            }
    
            const normalCommentData = {author:{id: email, name, email}, content: message};
            const replyCommentData = {...normalCommentData, threadOf: commentId};
    
            const commentData = commentId ? replyCommentData : normalCommentData;
    
            const {data} = await axios.post(url, commentData);

            if(data) {
                refetch(data.id);
                setComment({name: '', email: '', website: '', message: ''})
            }
            
            setLoading(false);
        } catch(error) {
            setError('You are having error')
        }
    }


    function inputHandler(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setError('');
        setComment({...comment, [e.target.name] : e.target.value});
    }

    if(error) {
        
    }

  return (
        <form onSubmit={postComment} >
            {error &&  <p className="text-red mb-4">{error}</p>}
            <div className="md:flex md:-mx-3.5">
                <div className="md:w-1/3 md:mx-3.5">
                    <Input 
                    className="mb-5"
                    error=""
                    placeholder="Name *"
                    name="name"
                    value={comment.name}
                    onChange={inputHandler}
                    type="text"
                    required
                />
                </div>
                <div className="md:w-1/3 md:mx-3.5">
                    <Input 
                    className="mb-5"
                    error=""
                    placeholder="Email *"
                    name="email"
                    value={comment.email}
                    onChange={inputHandler}
                    type="email"
                    required
                />
                </div>
                <div className="md:w-1/3 md:mx-3.5">
                    <Input 
                    className="mb-5"
                    error=""
                    placeholder="Website"
                    name="website"
                    value={comment.website}
                    onChange={inputHandler}
                    type="text"
                />
                </div>
            </div>

            {/* <div className="mb-2 flex">
                <CheckboxButton 
                    className="mr-2 mt-1" 
                    name="prefer-contact[]" 
                    value="Phone" 
                    label="Save my name, email, and website in this browser for the next time I comment." />
            </div> */}
            <div>
                <label className="font-bold pt-4 mb-2 block leading-tight">Comment*</label>
                <Textarea placeholder="Message" name="message" value={comment.message} onChange={inputHandler} />
            </div>
            
            <Button type="submit" variant="secondary" name="Post Comment" className="md:w-auto" disabled={loading} />
        </form>
  )
}
