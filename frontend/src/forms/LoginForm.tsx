'use client';

import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import { useRouter } from 'next/navigation';
import { ChangeEvent, FormEvent, useContext, useState } from 'react';
import axios from "axios";
import MessageBox from '@/components/MessageBox';
import { UserContext, UserTypes } from '@/providers/AuthProvider';
import { setTokenCookie } from '@/utils/cookies';


export default function LoginForm() {
  const [user, setUser] = useState({identifier: '', password: ''});
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const {dispatch} = useContext(UserContext);

  const router = useRouter();

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
      if (user.identifier && user.password) {
        const { data } = await axios.post(url, user);

        if (data.jwt) {
          setSuccess('Logged in successfully!')
          setLoading(false);

          const cookie = await setTokenCookie(data.jwt);

          if(cookie.status === 200) {
            dispatch({type: UserTypes.AddUser, payload: {
              id: data.user.id, 
              name: data.user.username, 
              email: data.user.email}})
  
            router.push('/profile');
          }

        } else {
          setError('Not Found!')
        }
      }
    } catch (error) {
      setError('Invalid Credentials!');
      setLoading(false);
    }
  };
  return (
    <>
    {error && <MessageBox message={error} />}
    {success && <MessageBox message={success} />}
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
