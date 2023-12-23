import FaIcons from "@/components/FaIcons";
import { Link } from 'nextjs13-progress';

export default function NotFound() {
  return (
    <main className="bg-gray/20 xl:-mt-7.5">
        <div className="py-40 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            <div className="flex items-center justify-center flex-col text-center">
                <h2 className="leading-[1.1] text-primary text-[100px] font-bold">404</h2>
                <h3 className="font-semibold text-2xl text-gray-darker mb-10">Oops! The page you were looking for, couldn&apos;t be found.</h3>
                <Link href="/" className="text-gray-darker hover:text-primary transition-colors duration-500 ease-in-out">
                    <span className="pr-2">Back to home page</span>
                    <FaIcons icon="faArrowRight" />
                </Link>
            </div>
        </div>
    </main>
  )
}
