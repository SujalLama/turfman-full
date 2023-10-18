import Link from "next/link";
import FaIcons from "./FaIcons";

export default function Pagination() {
  return (
    <div className=" large:pt-4 font-bold text-[15px] text-[#2c2c2c] text-center">
        <Link href="#" className="px-[17px] py-[10px] border border-[#eee] mx-[2px] inline-block hover:text-white hover:bg-primary hover:border-primary transition-colors ease-in-out duration-500">
            <span>
                <i className="fa-solid fa-chevron-left"></i>
                <FaIcons icon="faChevronLeft" />
            </span>
        </Link>
        <Link href="#" className="px-[17px] py-[10px] border border-[#eee] mx-[2px] inline-block hover:text-white hover:bg-primary hover:border-primary transition-colors ease-in-out duration-500">
            <span>1</span>
        </Link>
        <Link href="#" className="px-[17px] py-[10px] border border-[#eee] mx-[2px] inline-block hover:text-white hover:bg-primary hover:border-primary transition-colors ease-in-out duration-500">
            <span>2</span>
        </Link>
        <Link href="#" className="px-[17px] py-[10px] border border-[#eee] mx-[2px] inline-block hover:text-white hover:bg-primary hover:border-primary transition-colors ease-in-out duration-500">
            <span>
                <FaIcons icon="faChevronRight" />
            </span>
        </Link>
    </div>
  )
}
