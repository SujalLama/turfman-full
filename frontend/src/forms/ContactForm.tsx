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
    <div className="large:w-3/5">
        <h2 className="text-gray-darker text-[40px] leading-[46px] font-bold mb-12">Send Us a Message</h2>
        <form action="">
            <div className="">
                <div className="md:flex md:-mx-3.5">
                  <div className="md:w-1/2 md:mx-3.5">
                    <Input className="mb-5" 
                      placeholder="Your Name *" 
                      type="text" 
                      name="your-name" 
                      value="" 
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {}} 
                      error="" />
                  </div>
                  <div className="md:w-1/2 md:mx-3.5">
                    <Input className="mb-5" 
                      placeholder="Your Phone *" 
                      type="text" 
                      name="your-phone" 
                      value="" 
                      onChange={(e: ChangeEvent<HTMLInputElement>) => {}} 
                      error="" />
                  </div>
                </div>

                <div className="md:flex md:-mx-3.5">
                  <div className="md:w-1/2 md:mx-3.5">
                      <Input className="mb-5" 
                        placeholder="Your Email *" 
                        type="email" 
                        name="your-email" 
                        value="" 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {}} 
                        error="" />
                    </div>
                    <div className="md:w-1/2 md:mx-3.5">
                      <Input className="mb-5" 
                        placeholder="Address" 
                        type="text" 
                        name="address" 
                        value="" 
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {}} 
                        error="" />
                    </div>
                    
                </div>

                <fieldset className="mb-5">
                    <legend className="font-bold pt-4 mb-4">Calculate Area</legend>
                    <div className="md:flex mb-5">
                        <div className="md:flex-2 mb-2">
                            <Input className="mb-5"
                              type="text"
                              error=""
                              placeholder="length"
                              value=""
                              name="length"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                            />
                            <small className="clsSmall">meter</small>
                        </div>
                        
                        <div className="md:flex-1 md:mx-4 mb-2 text-center  md:text-sm md:mb-0 font-bold">
                            <p>X</p>
                        </div>

                        <div className="md:flex-2 mb-2">
                            <Input className="mb-5"
                              type="text"
                              error=""
                              placeholder="width"
                              value=""
                              name="width"
                              onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                            />
                            <small className="clsSmall">meter</small>
                        </div>

                        <div className="md:flex-1 md:mx-4 mb-2 text-center  md:text-sm md:mb-0 font-bold">
                            <p>=</p>
                        </div>
                        
                        <div className="md:flex-2">
                              <Input className="mb-5"
                                type="text"
                                error=""
                                placeholder="area"
                                value=""
                                name="area"
                                onChange={(e: ChangeEvent<HTMLInputElement>) => {}}
                            />
                            <small className="clsSmall">meter<sup>2</sup></small>
                        </div>
                
                    </div>
                </fieldset>

                <div className="md:flex md:-mx-3.5">
                  <div className="md:w-1/2 md:mx-3.5">
                    <Select 
                      name={option1.name} 
                      options={option1.options}
                      value=""
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {return ""}}/>
                  </div>
                  <div className="md:w-1/2 md:mx-3.5">
                    <Select 
                      name={option2.name} 
                      options={option2.options}
                      value=""
                      onChange={(e: ChangeEvent<HTMLSelectElement>) => {return ""}}/>
                  </div>
                    
                </div>

                <div className="md:flex md:-mx-3.5 mb-5">
                    <div className="mb-5 md:w-1/2 md:mx-3.5">
                        <label className="font-bold pt-4 mb-2 block">Delivery </label>
                        {
                          radioButton.options.map(radioItem => {
                            return (
                              <div key={radioItem} className="mb-2">
                                <RadioButton name={radioButton.name} value={radioItem}  className="mr-1" />
                              </div>)
                          })
                        }
                        
                    </div>

                    <div className="mb-5 md:w-1/2 md:mx-3.5">
                        <label className="font-bold pt-4 mb-2 block leading-tight">Preferred method to contact</label>
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


                <Textarea  placeholder="Message" name="message" />
                
                <div className="md:flex md:-mx-3.5 md:mb-5">
                  <FileInput className="mb-5 md:mx-3.5" name="image1" />
                  <FileInput className="mb-5 md:mx-3.5" name="image2" />
                  <FileInput className="mb-5 md:mx-3.5" name="image3" />
                </div>

                <div className="mb-8 md:flex md:-mx-3.5">
                    <div className="md:w-1/2 md:mx-3.5">
                        <label className="font-bold mb-2 block" htmlFor="Solve Captcha*">Solve Captcha*</label>
                        {/* captcha itegration */}
                    </div>
                    
                    <div className="md:w-1/2 md:mx-3.5">
                        <label className="font-bold mb-2 block">Enter Captcha Here : </label>
                      <Input className="mb-5" type="text" value="" error="" name="" onChange={() => {}} />
                    </div>
                </div>
            </div>

            <div className="text-center">
                  <Button type="submit" name="Send Message" className="md:w-auto" variant="secondary"/>
            </div>
        </form>
    </div>
  )
}
