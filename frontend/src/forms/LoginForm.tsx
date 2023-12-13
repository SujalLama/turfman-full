'use client';

import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useContext, useEffect, useLayoutEffect, useState } from 'react';
import axios, { AxiosError } from "axios";
import MessageBox from '@/components/MessageBox';
import { UserContext, UserTypes } from '@/providers/AuthProvider';
import Loader from '@/components/Loader';



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
            token: data.jwt, 
            id: data.user.id, 
            username: data.user.username, 
            email: data.user.email, 
            phone: data.user.phone,
            address: data.user.address,
            postalCode: data.user.postal_code,
            state: data.user.state,
            city: data.user.city,
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
    {loading && <Loader />}
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
