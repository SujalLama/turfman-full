"use client";

import { ChangeEvent } from "react";
import CheckboxButton from "@/components/forms/Checkbox";
import Textarea from "@/components/forms/Textarea";
import FileInput from "@/components/forms/File";
import Button from "@/components/forms/Button";
import Select from "@/components/forms/Select";
import RadioButton from "@/components/forms/RadioButton";
import Input from "@/components/forms/Input";

const option1 = {
    name: 'turf',
    options: [{value: "Empire Zoysia", name: "Empire Zoysia"},
    {value: "Kikuyu", name: "Kikuyu"},
    {value: "Villagegreen Kikuyu", name: "Villagegreen Kikuyu"},
    {value: "Santa    Anna", name: "Santa    Anna"},
    {value: "Sir Walter Buffalo", name: "Sir Walter Buffalo"},
    {value: "Wintergreen Couch", name: "Wintergreen Couch"},
    {value: "Other", name: "Other"},]
  }
  
  const option2 = {
    name: 'Fertilizer',
    options: [{value: "Eco-Prime Emerld", name: "Eco-Prime Emerld"},
    {value: "Eco-Prime Purple", name: "Eco-Prime Purple"},
    {value: "Eco-Prime Red", name: "Eco-Prime Red"},
    {value: "organic 2000 Multigrow", name: "organic 2000 Multigrow"},
    {value: "Normal wheel barrow", name: "Normal wheel barrow"},
    {value: "8×5 Cage Trailer", name: "8×5 Cage Trailer"},
    {value: "Lawn Roller", name: "Lawn Roller"},
    {value: "Rotary Roe", name: "Rotary Roe"},
    {value: "Turf cutter", name: "Turf cutter"},
    {value: "Motorise wheel Barrow", name: "Motorise wheel Barrow"},
    {value: "Automatic wheel barrow", name: "Automatic wheel barrow"},]
  }
  
  const radioButton = {
    name: 'pickup',
    options: [
      'pickup',
      'delivered',
      'supply and install'
    ]
  }
  
  const checkboxButton = {
    name: 'prefer-contact[]',
    options: [
      'phone',
      'email',
    ]
  }

export default function ContactForm() {
  return (
    <div className=" bg-gray-100 p-6 md:p-8">
        <h2 className="text-gray-darker text-[25px]  md:text-[40px] md:leading-[46px] font-bold mb-8 md:mb-12">Send Us a Message</h2>
        <form action="">
            <div className="">
                <label className="font-semibold mb-2 block">Contact</label>
                <div className="md:flex md:-mx-2 mb-2">
                  <div className="md:w-1/2 md:mx-2 mb-2 md:mb-0">
                    <Input
                      placeholder="Your Name *" 
                      type="text" 
                      name="your-name" 
                      value="" 
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {}} 
                      error="" />
                  </div>
                  <div className="md:w-1/2 md:mx-2">
                    <Input
                      placeholder="Your Phone *" 
                      type="text" 
                      name="your-phone" 
                      value="" 
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {}} 
                      error="" />
                  </div>
                </div>

                <div className="md:flex mb-8 md:-mx-2">
                  <div className="md:w-1/2 md:mx-2 mb-2 md:mb-0">
                      <Input 
                        placeholder="Your Email *" 
                        type="email" 
                        name="your-email" 
                        value="" 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {}} 
                        error="" />
                    </div>
                    <div className="md:w-1/2 md:mx-2">
                      <Input
                        placeholder="Address" 
                        type="text" 
                        name="address" 
                        value="" 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {}} 
                        error="" />
                    </div>
                    
                </div>

                <fieldset className="mb-8">
                    
                    <label className="font-semibold mb-2 block">Calculate area</label>
                    <div className="md:flex md:items-center">
                        <div className="md:flex-2 ">
                            <Input 
                              type="text"
                              error=""
                              placeholder="length (m.)"
                              value=""
                              name="length"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                            />
                            
                        </div>
                        
                        <div className="md:flex-1 md:mx-4 my-2 md:my-0 text-center  md:text-sm md:mb-0 font-bold">
                            <p>X</p>
                        </div>

                        <div className="md:flex-2">
                            <Input 
                              type="text"
                              error=""
                              placeholder="width (m)"
                              value=""
                              name="width"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                            />
                            
                        </div>

                        <div className="md:flex-1 md:mx-4 my-2 md:my-0 text-center  md:text-sm md:mb-0 font-bold">
                            <p>=</p>
                        </div>
                        
                        <div className="md:flex-2">
                              <Input 
                                type="text"
                                error=""
                                placeholder="area (m.sq.)"
                                value=""
                                name="area"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                            />
                            
                        </div>
                
                    </div>
                </fieldset>


                <div className="mb-8">
                  
                  <label className="font-semibold mb-2 block">Select Categories</label>
                  <div className="md:flex md:-mx-3.5">
                    <div className="md:w-1/2 md:mx-3.5 mb-2 md:mb-0">
                      <Select 
                      className="!mb-0"
                        name={option1.name} 
                        options={option1.options}
                        value=""
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {return ""}}/>
                    </div>
                    <div className="md:w-1/2 md:mx-3.5">
                      <Select 
                        className="!mb-0"
                        name={option2.name} 
                        options={option2.options}
                        value=""
                        onChange={(e: ChangeEvent<HTMLSelectElement>) => {return ""}}/>
                    </div>
                  </div>
                </div>

                <div className="md:flex md:-mx-3.5 mb-8">
                    <div className="md:w-1/2 md:mx-3.5 mb-8 md:mb-0">
                        <label className="font-semibold mb-2 block">Delivery </label>
                        {
                          radioButton.options.map(radioItem => {
                            return (
                              <div key={radioItem} className="mb-2">
                                <RadioButton name={radioButton.name} value={radioItem}  className="mr-1" />
                              </div>)
                          })
                        }
                    </div>

                    <div className="md:w-1/2 md:mx-3.5">
                        <label className="font-semibold mb-2 block leading-tight">Preferred method to contact</label>
                        {
                          checkboxButton.options.map(checkItem => {
                            return (
                              <div key={checkItem} className="mb-2">
                                <CheckboxButton className="mr-1" name={checkboxButton.name} value={checkItem} />
                              </div>
                            )
                          })
                        }
                    </div>
                </div>

                <div className="mb-8">
                  <label className="font-semibold mb-2 block">Message</label>
                  <Textarea  placeholder="Message" name="message" className="!mb-0"/>
                </div>
                
                <div className="mb-8">
                  <label className="font-semibold mb-2 block">Attachments</label>
                  <div className="md:flex md:-mx-3.5">
                    <FileInput className=" md:mx-3.5" name="image1" />
                    <FileInput className=" md:mx-3.5" name="image2" />
                    <FileInput className=" md:mx-3.5" name="image3" />
                  </div>
                </div>

                
            </div>

            
            <Button type="submit" name="Send Message" className="md:w-auto" variant="secondary"/>
            
        </form>
    </div>
  )
}
