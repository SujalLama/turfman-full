'use client';

import Button from '@/components/forms/Button'
import Input from '@/components/forms/Input'
import Link from 'next/link'

export default function LoginForm() {
  return (
    <form>
        <Input 
            className="mb-3" 
            placeholder="Your Email *" 
            value="" 
            type="email" 
            name="your-email"
            error=""
            onChange={() => {}}
        />
        <Input 
            className="mb-3" 
            placeholder="Your Password *" 
            value="" 
            type="password" 
            name="your-email"
            error=""
        />
        <div className="mt-2 text-center">
            
            <Button type="submit" name='Login' />
        </div>
    </form>
           
  )
}
