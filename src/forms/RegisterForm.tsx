import Button from "@/components/forms/Button";
import Input from "@/components/forms/Input";

export default function RegisterForm() {
  return (
    <form>
        <div className="md:flex">
            <Input 
                className="mr-2 mb-3" 
                placeholder="Your Name" 
                value="" 
                type="text" 
                name="your-name"
                error="" 
            />
            <Input 
                className="mb-3" 
                placeholder="Your Email *" 
                value="" 
                type="email" 
                name="your-email"
                error=""    
            />
        </div>
        <Input 
            className="mb-2" 
            placeholder="Your Password *" 
            value="" 
            type="password" 
            name="your-email"
            error="" 
        />
                
        <Input 
            className="mb-2" 
            placeholder="Confirm Password *" 
            value="" 
            type="password" 
            name="your-email"
            error="" 
        />

        <div className="mt-2 text-center">
            <Button type="submit" name="Register" />
        </div>
    </form>
  )
}
