import OrderProvider from "@/providers/OrderProvider";
import OrderConfirm from "./OrderConfirm";


export default function page() {
  return (
    <OrderProvider>
      <OrderConfirm />
    </OrderProvider>
  )
}
