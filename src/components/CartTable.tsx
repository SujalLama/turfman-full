import Image from "next/image";
import Link from "next/link";
import FaIcons from "./FaIcons";
import MessageBox from "./MessageBox";

interface ICartTableProps {
    id: string;
    img: {src: string; alt: string;};
    link: string;
    name: string;
    price: number;
    quantity: number;
}


export default function CartTable({data} : {data: ICartTableProps[] | []}) {

    if(data.length === 0) {
        return (
            <>
                <MessageBox icon="faCartShopping" message="Your cart is empty" />
                <Link 
                    href="/shop" 
                    className="inline-block bg-gray-darker text-center py-4 px-7.5 text-sm rounded-[5px] text-white tracking-[1px] font-bold uppercase  hover:bg-primary transition-colors duration-500 ease-in-out disabled:bg-gray-300 ">
                    Return to shop
                </Link>
            </>
        )
    }

  return (
    <table className="w-full">
        <thead>
            <tr className="">
                <th className="border text-left px-4 py-2">Thumbnail image</th>
                <th className="border text-left px-4 py-2">Product</th>
                <th className="border text-left px-4 py-2">Price</th>
                <th className="border text-left px-4 py-2">Quantity</th>
                <th className="border text-left px-4 py-2">Subtotal</th>
                <th className="border text-left px-4 py-2">Remove item</th>
            </tr>
        </thead>
        <tbody>
            {
                data.map(cart => {
                    const {id, link, img, name, price, quantity} = cart;
                    return (
                        <tr id={id}>
                            <td className="border px-4 py-2">
                                <Link href={link} className="w-25 h-25 block">
                                    <Image 
                                        width="300" 
                                        height="300" 
                                        src={img.src} 
                                        className="w-full h-full object-cover object-center" 
                                        alt={img.alt} 
                                        loading="lazy" />
                                </Link>						
                            </td>

                            <td className="border px-4 py-2">
                                <Link href={link}>{name}</Link>						
                            </td>

                            <td className="border px-4 py-2">
                                <span>${price}</span>						
                            </td>

                            <td className="border px-4 py-2">
                                <input type="number" value={quantity} title="Qty" min="0" max="" step="1" placeholder="" />
                            </td>

                            <td className="border px-4 py-2">
                                <span>${quantity * price}</span>						
                            </td>

                            <td className="border px-4 py-2 text-center">
                                <button className="text-red text-3xl">
                                    <FaIcons icon="faXmark" />
                                </button>
                            </td>
                        </tr>
                    )
                })
            }
        </tbody>
    </table>
  )
}
