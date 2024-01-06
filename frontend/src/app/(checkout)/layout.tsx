import '../globals.css'
import type { Metadata } from 'next'
import { config } from '@fortawesome/fontawesome-svg-core'
import localFont from 'next/font/local'


import AuthProvider from '@/providers/AuthProvider'
import CartProvider from '@/providers/CartProvider'
import '@fortawesome/fontawesome-svg-core/styles.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-datepicker/dist/react-datepicker.css";

import { Next13NProgress} from 'nextjs13-progress';

import CheckoutHeader from '@/components/header/CheckoutHeader'
import ShippingProvider from '@/providers/ShippingProvider'
import Script from 'next/script'

config.autoAddCss = false


const roboto = localFont({
  src: [
    {
      path: '../fonts/Roboto/Roboto-Thin.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto/Roboto-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto/Roboto-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto/Roboto-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Roboto/Roboto-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-roboto'
});

const poppins = localFont({
  src: [
    {
      path: '../fonts/Poppins/Poppins-Thin.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-ExtraLight.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-Medium.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-SemiBold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-ExtraBold.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: '../fonts/Poppins/Poppins-Black.woff2',
      weight: '900',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: true,
  variable: '--font-poppins'
});

export const metadata: Metadata = {
  title: 'Checkout page',
  description: 'Checkout page for turfman',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      <body className={`${roboto.variable} ${poppins.variable} scroll-smooth font-sans font-normal leading-normal text-base text-gray-text`}>
      
        <AuthProvider>
          <CartProvider>
            <ShippingProvider>
              <div id="myportal" className='overflow-hidden'></div>
              <CheckoutHeader />
              {children}
            </ShippingProvider>
          </CartProvider>
        </AuthProvider>
        <Next13NProgress color="#86bb46" height={5} />

        <Script src={process.env.NEXT_PUBLIC_AFTER_PAY_SCRIPT_URL!} />
        <Script async
    src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY!}&libraries=places&callback=initMap`} />

      </body>
    </html>
  )
}
