
import MessageBox from "@/components/MessageBox";

export default function EmailConfirmation() {
  return (
    <div className="flex items-center justify-center mt-10 px-7.5">
      <div className="max-w-[600px]">
        <MessageBox message="If you are redirected here from your email, then youre email is confirmed. 
          Please signin to login." link={{name: "login",path: "/login"}}/>
      </div>
    </div>
  )
}
