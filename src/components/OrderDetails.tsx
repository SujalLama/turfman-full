interface IOrder {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export default function OrderDetails({orders, shippingCost = 0}: {orders: IOrder[], shippingCost?: number;}) {
    const subtotal = orders.map(order => (order.price * order.quantity)).reduce((acc, total) => acc + total);
    const shipping = shippingCost;
    const tax = 4.67;
    const total = subtotal + shipping + tax;

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
                {
                    orders.map(order => {
                        return (
                            <tr key={order.id}>
                                <td className="border px-[9px] py-[12px]">
                                    <span>{order.name}</span>&nbsp;<strong>×&nbsp;{order.quantity}</strong>
                                </td>
                                <td className="border px-[9px] py-[12px]">
                                    <span>${order.price}</span>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>

            <tfoot>
                <tr>
                    <th className="border px-[9px] py-[12px]">Subtotal</th>
                    <td className="border px-[9px] py-[12px]">
                        <span>${subtotal}</span>
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
                        <strong>${total}</strong> 
                        <small>(includes <span>$4.64</span> GST)</small>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
  )
}
