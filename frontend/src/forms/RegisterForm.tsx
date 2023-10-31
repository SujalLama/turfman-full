"use client";

import MessageBox from "@/components/MessageBox";
import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";
import { UserContext, UserTypes } from "@/providers/AuthProvider";
import { setTokenCookie } from "@/utils/cookies";
import axios from "axios";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useContext, useState } from "react";

export default function RegisterForm() {
    const [user, setUser] = useState({username: '', email: '', password: '', confirmPassword: ''});
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
  
    const handleRegister = async (e: FormEvent) => {
      e.preventDefault();
  
      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/local/register`;
      try {
        setLoading(true);
        setError('');

        if(user.password !== user.confirmPassword) {
            setLoading(false);
            setError('Passwords doesn\'t match with one another.')
            return;
        }

        if (user.username && user.password && user.email) {
          const { data } = await axios.post(url, {username: user.username, password: user.password, email: user.email});
  
          if (data.jwt) {
            setSuccess('Registered successfully!')

            await setTokenCookie(data.jwt);

            dispatch({type: UserTypes.AddUser, payload: {
                id: data.user.id, 
                name: data.user.username, 
                email: data.user.email}})
            setLoading(false);
            router.replace('/profile');
          } else {
            setError('Server Error')
          }
        }
      } catch (error) {
        setError('Server Error!');
        setLoading(false);
      }
    };

  return (
    <>
    {error && <MessageBox message={error} />}
    {success && <MessageBox message={success} />}
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
