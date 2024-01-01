
export default function ZipPayMessaging({amount} : {amount: number}) {
  return (
    <div className="mb-4" dangerouslySetInnerHTML={{__html: `
    <quadpay-widget-v3 amount="${amount}" merchantId="${process.env.NEXT_PUBLIC_ZIP_PAY_MERCHANT_ID!}" ></quadpay-widget-v3>
    `}}>

    </div>
  )
}
