import RegisterForm from "@/forms/RegisterForm";
import Link from "next/link";

export default function page() {
  return (
    <main className="bg-gray/5 xl:-mt-7.5">
      <div className="py-32 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <div className="flex items-center justify-center flex-col">
              <div className="bg-white p-5 md:p-8 rounded-[5px] shadow-sm max-w-[450px]">
                  <div className="mb-12 text-center">
                      <h2 className="leading-[1.1] text-primary text-[28px] font-bold  mb-2.5">Register form</h2>
                      <p className="leading-snug text-sm">Please fill up the form to register your account in our site.</p>
                  </div>
                  
                  <RegisterForm />
                          
                  <div className="pt-10 text-sm text-center">
                      <Link href="/login" className="inline-block mr-4 underline hover:text-primary mb-2 md:mb-0">
                        Already have an account?
                      </Link>
                  </div>
              </div>
          </div>
      </div>
    </main>
  )
}
