import LoginForm from '@/forms/LoginForm'
import Link from 'next/link'

export default function page() {
  return (
    <main className="bg-gray/5 xl:-mt-7.5">
        <div className="py-32 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            <div className="flex items-center justify-center flex-col">
                <div className="bg-white p-5 md:p-10 rounded-[5px] shadow max-w-[450px]">
                    <div className="mb-12 text-center">
                        <h2 className="leading-[1.1] text-primary text-[28px] font-bold mb-2.5">
                            Login form
                        </h2>
                        <p className="leading-snug text-sm">
                            Please fill up the form. If you want to sign in.
                        </p>
                    </div>
                    <LoginForm />
                     
                    <div className="pt-10 flex flex-col md:flex-row md:items-center justify-between text-sm">
                        <Link href="/register" className="inline-block mr-4 underline hover:text-primary mb-2 md:mb-0">
                            Don&apos;t have an account?</Link>
                        <Link href="/forgot-password" className="underline hover:text-primary">
                            Forgot Password?
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    </main>
  )
}
