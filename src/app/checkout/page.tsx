import FaIcons from "@/components/FaIcons";
import MessageBox from "@/components/MessageBox";
import OrderDetails from "@/components/OrderDetails";
import BillingForm from "@/forms/BillingForm";
import CouponForm from "@/forms/CouponForm";
import PaymentForm from "@/forms/PaymentForm";
import ShippingForm from "@/forms/ShippingForm";
import PageHero from "@/section/PageHero";

const pageHeroData = {
  bgImg: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
      alt: 'page hero'
  },
  title: 'Checkout'
}
const orderData = [
  {
      id: 'ndi093',
      name: 'Kikuyu',
      quantity: 4,
      price: 12,
  },
  {
      id: 'ndi093nii',
      name: 'Villagegreen Kikuyu',
      quantity: 1,
      price: 42,
  },
]

export default function page() {
  return (
    <>
    <PageHero data={pageHeroData} />
    <main className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
        <MessageBox icon="faCartShopping" message="Already have an account?" link={{path:"/login", name: "login"}}/>
        <MessageBox icon="faCartShopping" message="Don't have an account?" link={{path:"/register", name: "register"}}/>
        <CouponForm />
        <BillingForm />
        <ShippingForm />
        <OrderDetails orders={orderData} />
        <PaymentForm />

        <p className="mt-8">
          <FaIcons icon="faCreditCard" className="pr-4" />
          We do not save any credit card information. 
        </p>
    </main>
    </>
  )
}
