import FaIcons from "./FaIcons";
import { Dispatch, SetStateAction } from "react";

export default function Pagination({
    pageNumber, setPageNumber, totalPages
} : {pageNumber: number, setPageNumber : Dispatch<SetStateAction<number>>, totalPages: number}) {

    function nextPage() {
        setPageNumber(prev => {
            if(prev === totalPages) {
                return totalPages
            }

            return prev + 1
        })
    }

    function prevPage() {
        setPageNumber(prev => {
            if(prev === 1) {
                return 1
            }

            return prev - 1
        })
    }

    function goToPage(page : number) {
        setPageNumber(page);
    }

  return (
    <div className=" large:pt-8 font-bold text-[15px] text-[#2c2c2c] text-center">
        <button 
            onClick={prevPage} 
            className="px-[17px] py-[10px] border border-[#eee] mx-[2px] 
            inline-block hover:text-white hover:bg-primary hover:border-primary 
            transition-colors ease-in-out duration-500 disabled:bg-gray-200 
            disabled:text-white disabled:cursor-not-allowed disabled:transition-none disabled:border-0 mb-2"
            disabled={(pageNumber === 1) || totalPages === 1}
            >
            <span>
                <i className="fa-solid fa-chevron-left"></i>
                <FaIcons icon="faChevronLeft" />
            </span>
        </button>
        {
            Array(totalPages).fill(0).map((_,i) => {
                return <button
                        key={i+1}
                        onClick={() => goToPage(i + 1)} 
                        className={`${pageNumber === i+1 ? "bg-primary text-white" : ""} mb-2 px-[17px] py-[10px] border border-[#eee] mx-[2px] inline-block hover:text-white hover:bg-primary hover:border-primary transition-colors ease-in-out duration-500`}>
                            {i+1}
                        </button>
            })
        }
        
        <button 
            onClick={nextPage} 
            className="px-[17px] py-[10px] border border-[#eee] mx-[2px] inline-block hover:text-white 
            hover:bg-primary hover:border-primary transition-colors ease-in-out duration-500 disabled:bg-gray-200 
            disabled:text-white disabled:cursor-not-allowed disabled:transition-none disabled:border-0 mb-2"
            disabled={(pageNumber === totalPages) || totalPages === 1}
            >
            <span>
                <FaIcons icon="faChevronRight" />
            </span>
        </button>
    </div>
  )
}
