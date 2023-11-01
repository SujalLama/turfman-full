"use client";

import MessageBox from "@/components/MessageBox";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import { UserContext, UserTypes } from "@/providers/AuthProvider";

import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useLayoutEffect, useState } from "react";

export default function RegisterForm() {
    const [user, setUser] = useState({username: '', email: '', password: '', confirmPassword: ''});
    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [pageLoad, setPageLoad] = useState(false);
    const {state, dispatch} = useContext(UserContext);
  
    const router = useRouter();

    useLayoutEffect(() => {
      if(state?.token) {
        router.replace('profile');
      } else {
        setPageLoad(false);
      }
    }, [router, state])
  
    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setUser((currentUser) => ({
        ...currentUser,
        [name]: value,
      }));
    };
  
    const handleRegister = async (e: FormEvent) => {
      e.preventDefault();
  
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local/register`;
      try {
        setLoading(true);
        setError('');
        setSuccess('');

        if(user.password !== user.confirmPassword) {
            setLoading(false);
            setError('Passwords doesn\'t match with one another.')
            return;
        }

        if (user.username && user.password && user.email) {
          const { data } = await axios.post(url, {username: user.username, password: user.password, email: user.email});
  
          if(data?.user) {

            setSuccess('Registered successfully! Please check your mail for email confirmation.')
            setLoading(false);
            setUser({username: '', email: '', password: '', confirmPassword: ''})

          }
          
        }
      } catch (error) {
        const {response } = error as AxiosError;
        const data = response?.data as any;

        const errorMessage = data.error.message as string;
        
        setError(errorMessage);
        setLoading(false);
      }
    };

  if(pageLoad) {
    return <div>Loading...</div>
  }

  return (
    <>
    {error && <MessageBox message={error} success={false} />}
    {success && <MessageBox message={success} />}
    {loading && 
        <div role="status" className='flex items-center justify-center mb-8'>
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }
    <form onSubmit={handleRegister}>
        <div className="md:flex">
            <Input 
                className="mr-2 mb-3" 
                placeholder="Your Name" 
                value={user.username} 
                type="text" 
                name="username"
                error="" 
                onChange={handleChange}
                required
                disabled={loading}
            />
            <Input 
                className="mb-3" 
                placeholder="Your Email *" 
                value={user.email} 
                type="email" 
                name="email"
                error=""
                onChange={handleChange} 
                required
                disabled={loading}
            />
        </div>
        <Input 
            className="mb-2" 
            placeholder="Your Password *" 
            value={user.password}
            type="password" 
            name="password"
            error=""
            onChange={handleChange}
            required
            disabled={loading}
        />
                
        <Input 
            className="mb-2" 
            placeholder="Confirm Password *" 
            value={user.confirmPassword}
            type="password" 
            name="confirmPassword"
            error=""
            onChange={handleChange}
            required
            disabled={loading}
        />

        <div className="mt-2 text-center">
            <Button type="submit" name="Register" disabled={loading} />
        </div>
    </form>
    </>
  )
}
