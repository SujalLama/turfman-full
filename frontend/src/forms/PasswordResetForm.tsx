'use client';

import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import { ChangeEvent, FormEvent,useState } from 'react';
import axios, { AxiosError } from "axios";
import MessageBox from '@/components/MessageBox';
import { useSearchParams, useRouter } from 'next/navigation';
import Loader from '@/components/Loader';



export default function PasswordResetForm() {
  const [user, setUser] = useState({password: '', passwordConfirmation: ''});
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
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

    const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/reset-password`;
    
    try {
      setLoading(true);
      setError('');
      setSuccess('');

      if(user.password !== user.passwordConfirmation) {
        setError('Passwords doesn\'t match.');
        return;
      }

      if (user.password && user.passwordConfirmation) {
        const code = searchParams.get('code');
        

        const { data } = await axios.post(url, {...user, code});

        if (data) {
          setSuccess('Password reset successfull.')
          setLoading(false);
          router.replace('/login');
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


  return (
    <>
    {error && <MessageBox message={error} success={false} />}
    {success && <MessageBox message={success} />}
    {loading && <Loader />}
    <form onSubmit={handleLogin}>
        <Input 
            className="mb-3" 
            placeholder="Your password *" 
            value={user.password}
            type="password" 
            name="password"
            error=""
            required
            onChange={handleChange}
            disabled={loading}
        />
        <Input 
            className="mb-3" 
            placeholder="Your Confirm password *" 
            value={user.passwordConfirmation}
            type="password" 
            name="passwordConfirmation"
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
