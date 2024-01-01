
export default function AfterPayMessaging ({price,sku, category } : {price: number; sku: string; category: string;}) {
    return <div dangerouslySetInnerHTML={{__html: 
        `
        <square-placement
            data-mpid="0cfd13f3-3a82-467a-8304-e0f1ffd6f8a7"
            data-placement-id="bb1afad1-7ecd-4ecc-b61b-35b39c166c9b"
            data-page-type="product"
            data-amount="${price}"
            data-currency="AUD"
            data-consumer-locale=""
            data-item-skus="${sku}"
            data-item-categories="${category}"
            data-is-eligible="true">
        </square-placement>
        `
    }}>
    </div>
}