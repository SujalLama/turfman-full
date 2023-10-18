"use client";

import Button from "@/components/forms/Button";
import CheckboxButton from "@/components/forms/Checkbox";
import Input from "@/components/forms/Input";
import Textarea from "@/components/forms/Textarea";

export default function CommentForm() {
  return (
        <form action="">
            <div className="md:flex md:-mx-3.5">
                <div className="md:w-1/3 md:mx-3.5">
                    <Input 
                    className="mb-5"
                    error="this is true"
                    placeholder="Name"
                    name="name"
                    value=""
                    onChange={() => {}}
                    type="text"
                />
                </div>
                <div className="md:w-1/3 md:mx-3.5">
                    <Input 
                    className="mb-5"
                    error=""
                    placeholder="Email"
                    name="email"
                    value=""
                    onChange={() => {}}
                    type="email"
                />
                </div>
                <div className="md:w-1/3 md:mx-3.5">
                    <Input 
                    className="mb-5"
                    error=""
                    placeholder="Website"
                    name="website"
                    value=""
                    onChange={() => {}}
                    type="email"
                />
                </div>
            </div>

            <div className="mb-2 flex">
                <CheckboxButton 
                    className="mr-2 mt-1" 
                    name="prefer-contact[]" 
                    value="Phone" 
                    label="Save my name, email, and website in this browser for the next time I comment." />
            </div>
            <div>
                <label className="font-bold pt-4 mb-2 block leading-tight">Comment*</label>
                <Textarea placeholder="Message" name="message" />
            </div>
            
            <Button type="submit" variant="secondary" name="Post Comment" className="md:w-auto"/>
        </form>
  )
}
