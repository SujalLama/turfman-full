import ProductTabs from "@/section/ProductTabs"
import RelatedProducts from "@/section/RelatedProducts"
import SingleProductContent from "@/section/SingleProductContent"

const productDetailData = {
  tabs: [{
    name: 'Description',
    value: 'desc',
    content: `<h2>Description</h2>
    
    <p>Organic 2000 Multi-grow is 100% pelletised sawdust bedded poultry manure that has been naturally composted.Certified Organic, improved soil structure, greater water retention, reduced leaching, and weed control are some of the many benefits of using Multi Grow fertilisers in horticulture. In addition to these “standard fertilisers” Organic 2000 can customize a blend to suit your own particular needs.<br>
    Organic Multi Grow is good general purpose fertiliser and it is suitable for almost all plants (avoid using on Proteaceae natives). This furtiliser contains a range of important plant nutrients. Low odour and easy to apply.</p>

    <p>Organic Multi-Grow is ideal for:</p>

    <p>• Seedbed preparation<br>
    • Side dressing of horticultural crops<br>
    • Seedling pre-plant<br>
    • Under vine side dressing<br>
    • Flower beds<br>
    • Fruit trees<br>
    • Broadcasting</p>
    <p>Organic Multi-Grow Benefits:</p>
    <p>– Organic composted poultry manure<br>
    – Activated soil microbiology<br>
    – Improves soil fertility and health<br>
    – Natural balance NPK and trace elements<br>
    – Retains moisture and nutrients at the root zone<br>
    – Reduces leaching<br>
    -Spreads easily through standard spreaders</p>
    <p>Point to be noted: Ring us for large quantity.</p>
    <p>Uses: Use 1 – 2 handfuls per square metre (approx. 100gms)</p>
    <p>Ingredients:</p>
    <p>Total Nitrogen % 3.5<br>
    Total Phosphorus % 0.9<br>
    Potassium % 1.7<br>
    Sodium % 0.33<br>
    Calcuim % 3.6<br>
    Magnesium % 0.56<br>
    Total Sulphur % 0.51<br>
    Copper ppm 50<br>
    Zinc ppm 310<br>
    Manganese ppm 405<br>
    Iron ppm 1250<br>
    Water Content % 13 ph (1:5 water) 6.2</p>
    <p>&nbsp;</p>
    <p>&nbsp;</p>
    `
  },
  {
    name: 'Additional Information',
    value: 'addInfo',
    content: `
    <h2>Additional information</h2>      
      <table>
          <tbody>
              <tr>
                  <th>Weight</th>
                  <td>N/A</td>
              </tr>
              <tr>
                  <th>Kg</th>
                  <td>2kg, 5kg, 15kg, 25kg</td>
              </tr>
          </tbody>
      </table>
      `
  }]
}

export default function page() {
  return (
    <main>
        <div className="my-25 px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
            <SingleProductContent />
            <ProductTabs tabs={productDetailData.tabs} />
        </div>

        {/* <!--related products--> */}
        <RelatedProducts />
    </main>
  )
}
