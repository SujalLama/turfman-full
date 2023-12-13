'use client';

import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import { ChangeEvent, FormEvent,useState } from 'react';
import axios, { AxiosError } from "axios";
import MessageBox from '@/components/MessageBox';
import Loader from '@/components/Loader';



export default function ForgotPasswordForm() {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);


  const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setEmail(value);
  };

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/forgot-password`;
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      if (email) {
        const { data } = await axios.post(url, {email});

        if (data) {
          setSuccess('Password reset link is sent to your email.')
          setLoading(false);
        }
      }
    } catch (error) {
      const {response } = error as AxiosError;
        const data = response?.data as any;

        const errorMessage = data.error.message as string;
        console.log(response);
        setError(errorMessage);
        setLoading(false);
    }
  };


  return (
    <>
    {error && <MessageBox message={error} success={false} />}
    {success && <MessageBox message={success} />}
    {loading && 
        <Loader />
    }
    <form onSubmit={handleLogin}>
        <Input 
            className="mb-3" 
            placeholder="Your Email *" 
            value={email}
            type="email" 
            name="email"
            error=""
            required
            onChange={handleChange}
            disabled={loading}
        />
        <div className="mt-2 text-center">
            <Button type="submit" name='Send Me Reset Link' disabled={loading} />
        </div>
    </form>
    </>
  )
}
