"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import CheckboxButton from "@/components/forms/Checkbox";
import Textarea from "@/components/forms/Textarea";
import FileInput from "@/components/forms/File";
import Button from "@/components/forms/Button";
import Select from "@/components/forms/Select";
import RadioButton from "@/components/forms/RadioButton";
import Input from "@/components/forms/Input";
import QueryProvider from "@/providers/QueryProvider";
import { useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { API_URL, CAPTCHA_ID } from "@/api/constants";
import ReCAPTCHA from "react-google-recaptcha";

  const radioButton = {
    name: 'delivery',
    options: [
      'pickup',
      'delivered',
      'supply and install'
    ]
  }
  
  const checkboxButton = {
    name: 'preferContact',
    options: [
      'phone',
      'email',
    ]
  }

type ContactFormData = {
    name: string;
    email: string;
    phone: string;
    address: string;
    delivery: string;
    message: string;
}

export default function ContactForm() {
  const[loading, setLoading] = useState(false);
  const[error, setError] = useState("");
  const[success, setSuccess] = useState("");

  const [contactFormData, setContactFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    address: "",
    phone: "",
    delivery: "",
    message: ""
  });
  const [area, setArea] = useState({length: 0, width: 0})
  const [product, setProduct] = useState("");
  const [secondProduct, setSecondProduct] = useState("");
  const [preferContact, setPreferContact] = useState<string[]>([])
  const [files, setFiles] = useState<FileList | null>(null)
  const [captcha, setCaptcha] = useState<string | null>(null)

  function handleChange (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setContactFormData((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  function handlePreferContactChange (checked:boolean, value: string) {
    if(checked) {
      setPreferContact([...preferContact, value])
    } else {
      setPreferContact(prev => prev.filter(item => item !== value))
    }
  }

  function handleChangeArea (e:ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setArea((prev) => ({...prev, [e.target.name]: e.target.value}))
  }

  async function handleSubmit(e: FormEvent) {

    try {
      setLoading(true);
      setError('');
      setSuccess('');

      e.preventDefault();
      const api = API_URL + '/contacts';
      const products = [];

      const {email, phone, name} = contactFormData;

      if(!email || !phone || !name) {
        setLoading(false);
        setError("Please provide the required field.")
        return;
      }
  
      if(product) {
        products.push(parseInt(product))
      }
  
      if(secondProduct) {
        products.push(parseInt(secondProduct))
      }
  
      const delivery = contactFormData.delivery === "delivered" ? 'deliver' : contactFormData.delivery === "supply and install" ? "supply" : "pickup";
      const contactData = {...contactFormData, delivery, captcha};
  
      const formData = new FormData();
  
      formData.append("data", JSON.stringify({...contactData, area: area.length * area.width, products, preferContact}));
  
      if(files?.length) {
        
        for(let i = 0; i < files.length; i++) {
          
          const file = files.item(i);
          
          if(file) {
            formData.append('files.attachments', file, file.name)
          }
        }
        
      }
  
      const {data} = await axios.post(api, formData);
      
      setLoading(false);

      if(!data) {
        setError('Error while sending!')
        return;
      }


      setArea({length: 0, width: 0})
      setProduct("");
      setSecondProduct("");
      setPreferContact([])
      setFiles(null)
      setContactFormData({
        name: "",
        email: "",
        address: "",
        phone: "",
        delivery: "",
        message: ""
      });
      setSuccess('Your message is succesfully sent. Thank you.')
  

    } catch(error) {
      const {response } = error as AxiosError;
      const data = response?.data as any;

      const errorMessage = data.error.message as string;
      
      setError(data?.error?.name + ' : ' + errorMessage);
      setLoading(false);
      
    }
  }

  function handleFile(e: ChangeEvent<HTMLInputElement>) {
    setFiles(e.target.files)
  }

  function onChangeCaptcha(value : string | null) {
    console.log("Captcha value:", value);
    setCaptcha(value);
  }
  

  
  return (
    <div className=" bg-gray-100 p-6 md:p-8">
        <h2 className="text-gray-darker text-[25px] text-center md:text-[35px]  font-bold mb-8">Send Us a Message</h2>

        {error && <p className="text-xl text-red mb-4 text-center">{error}</p>}
        {success && <p className="text-xl text-primary mb-4 text-center">{success}</p>}

        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="">
                <label className="font-semibold mb-3 block">Contact</label>
                <div className="md:flex md:-mx-2 mb-2">
                  <div className="md:w-1/2 md:mx-2 mb-2 md:mb-0">
                    <Input
                      placeholder="Your Name *" 
                      type="text" 
                      name="name" 
                      value={contactFormData.name} 
                      onChange={handleChange} 
                      disabled={loading}
                      error="" />
                  </div>
                  <div className="md:w-1/2 md:mx-2">
                    <Input
                      placeholder="Your Phone *" 
                      type="text" 
                      name="phone"
                      value={contactFormData.phone}
                      onChange={handleChange} 
                      disabled={loading}
                      error="" />
                  </div>
                </div>

                <div className="md:flex mb-8 md:-mx-2">
                  <div className="md:w-1/2 md:mx-2 mb-2 md:mb-0">
                      <Input 
                        placeholder="Your Email *" 
                        type="email" 
                        name="email" 
                        value={contactFormData.email}
                        onChange={handleChange} 
                        disabled={loading}
                        error="" />
                    </div>
                    <div className="md:w-1/2 md:mx-2">
                      <Input
                        placeholder="Address" 
                        type="text" 
                        name="address" 
                        value={contactFormData.address} 
                        onChange={handleChange}
                        disabled={loading}
                        error="" />
                    </div>
                    
                </div>

                <fieldset className="mb-8">
                    
                    <label className="font-semibold mb-3 block">Calculate area</label>
                    <div className="md:flex md:items-center">
                        <div className="md:flex-2 ">
                          <span className="text-xs mb-1 block">length (m)</span>
                            <Input 
                              type="number"
                              error=""
                              min={0}
                              placeholder="length (m.)"
                              value={area.length}
                              name="length"
                              disabled={loading}
                              onChange={handleChangeArea}
                            />
                            
                        </div>
                        
                        <div className="md:flex-1 md:mx-4 my-2 md:my-0 text-center  md:text-sm md:mb-0 font-bold">
                            <p>X</p>
                        </div>

                        <div className="md:flex-2">
                          <span className="text-xs mb-1 block">width (m)</span>
                            <Input 
                              type="number"
                              error=""
                              placeholder="width (m)"
                              value={area.width}
                              name="width"
                              disabled={loading}
                              min={0}
                              onChange={handleChangeArea}
                            />
                            
                        </div>

                        <div className="md:flex-1 md:mx-4 my-2 md:my-0 text-center  md:text-sm md:mb-0 font-bold">
                            <p>=</p>
                        </div>
                        
                        <div className="md:flex-2">
                          <span className="text-xs mb-1 block">area (m.sq.)</span>
                              <Input 
                                type="text"
                                error=""
                                placeholder="area (m.sq.)"
                                disabled={loading}
                                value={area.length * area.width}
                                name="area"
                            />
                            
                        </div>
                
                    </div>
                </fieldset>


                

                <div className="md:flex md:-mx-3.5 mb-8">
                    <div className="md:w-1/2 md:mx-3.5 mb-8 md:mb-0">
                        <label className="font-semibold mb-2 block">Delivery </label>
                        {
                          radioButton.options.map(radioItem => {
                            return (
                              <div key={radioItem} className="mb-2">
                                <RadioButton 
                                  name={radioButton.name} 
                                  value={radioItem}  
                                  className="mr-1" 
                                  onChange={handleChange} 
                                  disabled={loading}
                                />
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
                                <CheckboxButton 
                                  className="mr-1" 
                                  name={checkboxButton.name} 
                                  value={checkItem} 
                                  onChange={handlePreferContactChange}
                                  disabled={loading}
                                />
                              </div>
                            )
                          })
                        }
                    </div>
                </div>

                <div className="mb-8">
                  
                    <label className="font-semibold mb-2 block">Select Products</label>
                    
                      <div className="md:flex md:-mx-3.5 ">
                        <QueryProvider>
                            <SelectProduct 
                              category="turf" 
                              key="turf" 
                              onChange={(e) => setProduct(e.target.value)} 
                              value={product}
                              disabled={loading}
                            />
                            <SelectProduct 
                              category="fertiliser" 
                              key="fertiliser" 
                              onChange={(e) => setSecondProduct(e.target.value)} 
                              value={secondProduct}
                              disabled={loading}
                            />
                        </QueryProvider>
                      </div>
                </div>


                <div className="mb-8">
                  <label className="font-semibold mb-2 block">Message</label>
                  <Textarea  placeholder="Message" name="message" className="!mb-0" onChange={handleChange} disabled={loading} />
                </div>

                <div className="md:flex md:-mx-3.5 mb-8">
                    <div className="md:w-[calc(50%_-_30px)] md:mx-3.5">
                        <label className="font-semibold mb-2 block">Attachments</label>
                        <FileInput  name="attachments" multiple onChange={handleFile} disabled={loading} />
                    </div>
                </div>
            </div>

            <div className="mb-8">
                <ReCAPTCHA
                  sitekey={CAPTCHA_ID}
                  onChange={onChangeCaptcha}
                />
            </div>

            {error && <p className="text-xl text-red mb-6 text-center">{error}</p>}
            {success && <p className="text-xl text-primary mb-6 text-center">{success}</p>}

            <div className="text-center">
              <Button type="submit" name="Send Message" className="md:w-auto" variant="secondary" disabled={loading} />
            </div>
            
        </form>
    </div>
  )
}

function SelectProduct({category, onChange, value, disabled}:{category: string, onChange: (e: ChangeEvent<HTMLSelectElement>) => void, value: string; disabled: boolean}) {
  const {data, isPending} = useQuery({queryKey: [category], queryFn: getProducts})

  async function getProducts() {
    const url = API_URL + `/products?populate=product_category&filters[product_category][slug][$eq]=${category}`
    const {data:{data}} = await axios.get(url);
    
    if(!data) {
      return []
    }

    return formatProductsForOptions(data)
  }

  function formatProductsForOptions (data: any[]) : {value: string; name: string;}[] | undefined {
    if(data.length === 0) {
      return []
    }


    const newData = data.map(item => ({value: item.id, name: item.attributes.name}));

    newData.unshift({value: "", name: "Choose option"})
    return newData;
  }

  if(isPending) {
    return (
    <div className="md:w-1/2 md:mx-3.5 mb-2 md:mb-0" >
      <Select 
        className="!mb-0"
        name={category} 
        options={[{value: "", name: "Choose option"}]}
        value=""
        disabled={disabled}
      />
    </div>
  )
  }

  return (
    <div className="md:w-1/2 md:mx-3.5 mb-2 md:mb-0" >
      <Select 
        className="!mb-0"
        name={category} 
        options={data}
        value={value}
        onChange={onChange}/>
    </div>
  )
}