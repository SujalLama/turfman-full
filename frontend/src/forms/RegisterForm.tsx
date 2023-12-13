"use client";

import Loader from "@/components/Loader";
import Logoloader from "@/components/LogoLoader";
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
    return <Logoloader />
  }

  return (
    <>
    {error && <MessageBox message={error} success={false} />}
    {success && <MessageBox message={success} />}
    {loading && <Loader />
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
