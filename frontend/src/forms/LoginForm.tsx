'use client';

import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useContext, useEffect, useLayoutEffect, useState } from 'react';
import axios, { AxiosError } from "axios";
import MessageBox from '@/components/MessageBox';
import { UserContext, UserTypes } from '@/providers/AuthProvider';



export default function LoginForm() {
  const [user, setUser] = useState({identifier: '', password: ''});
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState('');
  const [pageLoad, setPageLoad] = useState(true);
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local`;
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);

        if (data.jwt) {

          dispatch({type: UserTypes.AddUser, payload: {
            token: data.jwt, id: data.user.id, username: data.user.username, email: data.user.email,
          }})
          setSuccess('Logged in successfully!')
          setLoading(false);
          

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
            <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin  fill-primary" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
            </svg>
            <span className="sr-only">Loading...</span>
        </div>
    }
    <form onSubmit={handleLogin}>
        <Input 
            className="mb-3" 
            placeholder="Your Email *" 
            value={user.identifier}
            type="email" 
            name="identifier"
            error=""
            required
            onChange={handleChange}
            disabled={loading}
        />
        <Input 
            className="mb-3" 
            placeholder="Your Password *" 
            value={user.password} 
            type="password" 
            name="password"
            required
            error=""
            onChange={handleChange}
            disabled={loading}
        />
        <div className="mt-2 text-center">
            <Button type="submit" name='Login' disabled={loading} />
        </div>
    </form>
    </>
  )
}
