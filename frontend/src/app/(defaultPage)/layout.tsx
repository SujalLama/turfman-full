import '../globals.css'
import type { Metadata } from 'next'
import Header from '@/components/header'
import Footer from '@/components/footer'
import { config } from '@fortawesome/fontawesome-svg-core'
import localFont from 'next/font/local'
import FloatingButton from '@/components/FloatingButton'
import '@fortawesome/fontawesome-svg-core/styles.css'
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "react-datepicker/dist/react-datepicker.css";


import AuthProvider from '@/providers/AuthProvider'
import CartProvider from '@/providers/CartProvider'
import ShippingProvider from '@/providers/ShippingProvider'
config.autoAddCss = false
import { Next13NProgress} from 'nextjs13-progress';
import Script from 'next/script'


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

// export const metadata: Metadata = {
//   title: 'Create Next App',
//   description: 'Generated by create next app',
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className='scroll-smooth'>
      {/* <Script src="https://kit.fontawesome.com/0467f5e0bb.js" crossOrigin='anonymous' strategy='beforeInteractive' /> */}
      <body className={`${roboto.variable} ${poppins.variable} relative scroll-smooth font-sans font-normal leading-normal text-base text-gray-text`}>
      
        <AuthProvider>
          <CartProvider>
            <ShippingProvider>
              <div id="myportal" className='overflow-hidden'></div>
              <Header />
              {children}
              <Footer />
              <FloatingButton />
            </ShippingProvider>
          </CartProvider>
        </AuthProvider>
        <Next13NProgress color="#86bb46" height={5} />
        <Script src={process.env.NEXT_PUBLIC_AFTER_PAY_MESSAGING!} async />
        <Script src={process.env.NEXT_PUBLIC_ZIP_PAY_MESSAGING!} async />
      </body>
    </html>
  )
}
