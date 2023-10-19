
export default function OrderDetails() {
  return (
    <div className="mb-6">
        <h3 className="font-bold text-gray-darker text-[28px] mb-4">Your order</h3>    
        <table className="text-left w-full">
            <thead>
                <tr>
                    <th className="border px-[9px] py-[12px">Product</th>
                    <th className="border px-[9px] py-[12px]">Subtotal</th>
                </tr>
            </thead>

            <tbody>
                <tr>
                    <td className="border px-[9px] py-[12px]">
                        Kikuyu&nbsp;<strong>×&nbsp;4</strong>
                    </td>
                    <td className="border px-[9px] py-[12px]">
                        <span>$40.00</span>
                    </td>
                </tr>

                <tr>
                    <td className="border px-[9px] py-[12px]">
                        Villagegreen Kikuyu&nbsp;<strong>×&nbsp;1</strong>
                    </td>
                    <td className="border px-[9px] py-[12px]">
                        <span>$11.00</span>
                    </td>
                </tr>
            </tbody>

            <tfoot>
                <tr>
                    <th className="border px-[9px] py-[12px]">Subtotal</th>
                    <td className="border px-[9px] py-[12px]">
                        <span>$51.00</span>
                    </td>
                </tr>
            
                <tr>
                    <th className="border px-[9px] py-[12px]">Shipping</th>
                    <td className="border px-[9px] py-[12px]">
                        Enter your address to view shipping options.
                    </td>
                </tr>
        
                <tr>
                    <th className="border px-[9px] py-[12px]">Total</th>
                    <td className="border px-[9px] py-[12px]">
                        <strong>$51.00</strong> 
                        <small>(includes <span>$4.64</span> GST)</small>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}
