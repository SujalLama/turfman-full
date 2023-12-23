import { Dispatch, ReactNode, SetStateAction } from "react"
import Portal from "./Portal"

const Modal = ({openModal, children, setOpenModal} : {
    openModal: boolean,
    setOpenModal: Dispatch<SetStateAction<boolean>>, 
    children: ReactNode
}) => {

    

    return (
        <Portal selector="myportal" show={openModal}>
            <div className="fixed top-0 left-0 w-screen h-screen bg-black/80 z-[60] overflow-auto ">
                <div className="max-w-[670px] mx-auto bg-white my-14 px-8 pt-4 pb-4">
                    <div className="text-right mb-4 leading-0">
                        <button className=" text-red font-bold hover:text-red/80 text-xl leading-0" onClick={() => setOpenModal(false)}>x</button>
                    </div>
                    {children}
                </div>
            </div>
        </Portal>
    )
}

export default Modal;