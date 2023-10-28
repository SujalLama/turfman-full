export const product = {
    category: "fertiliser"
}

export const product1 = {
    category: "DIY packages"
}

export const product2 = {
    category: "rented instrument"
}

export const product3 = {
    id: "asdnfidf",
    category: "grass",
    price: 13.50,
    stock: 0,
    unit: 'meter',
    name: 'Kikuyu',
    shortDesc: 'Kikuyu has an extremely adaptive and regenerating nature with excellent disease and pest resistance. It is budget-friendly and has an impressive heat resistance and low annoyance. It has good color retention in winters and prefers regular mowing.',
    sku: 'kikuyu',
    tags: ['kids-friendly', 'kikuyu', 'pet friendly', 'premium kikuyu'],
    options: [],
    description: []
}

export const cart = [
    {
        id: "",
        name: "",
        img: "",
        price: 20,
        quantity: 1,
    }
]

export type ProductType = {
    id: string;
    name: string;
    price: number;
    unit?: string;
    stock: number;
    shortDesc: string;
    sku: string;
    category: string;
    tags: string[];
    fullDesc: {name: string; content: string;}[]
}

export const products : ProductType[] = [
    {
        id: 'nidfn',
        name: 'Cape Soft leaf Buffalo',
        price: 13.50,
        unit: 'm',
        stock: 0,
        shortDesc: `Cape Soft-Leaf Buffalo, a new variety buffalo introduced by TheTurfMan has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.`,
        sku: 'CSLB',
        category: 'grass',
        tags: [ 'buffalo', 'buffalo grass', 'cape soft leaf', 'leaf' ],
        fullDesc: [
            {
                name: 'description',
                content: `Soft Leaf Buffalo
                Cape Soft-Leaf Buffalo has an average water usage requirement but isn’t as drought tolerant as some of the other varieties of buffalo out there. Its durability is good, with the thick grass providing people and pets with a soft surface to walk and rest on. It also shows great recovery to damage throughout the year. Its maintenance remains low like all Buffo grass, and due to its thickness and high matt, weeds are prevented from growing through.
                Buffalo is often the most desired for landscaped gardens, with its stunning broadleaf completing a beautiful scape. While the differences between Buffalo are subtle, they are many. Colour, leaf width, softness are just a few, while the budget may also come into play. But, whether Palmetto or Sir Walter and all of those in between, Green Oasis Guarantee™ always applies. Enquire today to have your own piece of Australia’s favourite lawn.
                During the winter months, this grass will develop a purple colour on the blade heads; however, this will vanish quickly during spring once the weather heats back up again. Similar to the Matilda Buffalo, Shade Master Soft-Leaf Buffalo would be an ideal choice for family lawns, high traffic areas like roadsides and alongside garden beds due to its non-invasive properties. This particular lawn provides great value for money, and while its drought tolerance is not as good as some of the newer Buffalo varieties, it is still a favourite amongst many of our customers.
                Water Usage: Low – MediumDrought Tolerance: Medium (60%)Durability: HighColour Quality: Medium (Traces of purple in the winter) High
                Soft Leaf Buffalo – Worth the hype?
                Provides a soft surface
                Broader leaf for more efficient photosynthesis
                Not prone to insect damage common in most other turf varieties
                Many cultivars available
                Less likely to spread into gardens
                Renovation work is relatively low
                High levels of disease resilience
                Shade tolerant
                Thick and broadleaf creates resiliency toward weed growth
                Low levels of allergy and irritability
                Lacks sharp edges of regular buffalo
                Retains colour well throughout winter
                Below you will find information on a selection of Buffalo cultivars that we recommend.
                All ratings are on a scale of 1-5, with 1 being the lowest and 5 being the highest. Water- the amount of water required. Softness- the softness of the turf. Growth rate- the speed of lawn growth. Activity- the turfs ability to cope with high levels of activity on the lawn. Maintenance- how much is required to maintain the turf. Evasiveness- the rate at which the turf spreads into garden beds etc. Sun- the amount of sun the cultivar requires.
                Soft Leaf Buffalo- An Aussie Favourite
                Retains its colour well
                Slow growing- less frequent mowing
                Not invasive
                Soft
                No sharp edges
                Less irritability
                Shade tolerant
                Fewer water requirements than most buffalo varieties
                Higher regenerative qualities than most buffalo varieties
                Follow Us on Facebook
                `
            },
        ],
    },
    {
        id: 'nidfnnidf03j',
        name: 'Santa Ana',
        price: 13,
        unit: 'm',
        stock: 0,
        shortDesc: `The Santa Ana Couch Grass is an American grass that gives an impressive visual appearance especially when mown short. Santa Anna is a mild seasonal grass with bright green, fine leaves.`,
        sku: 'CSLB',
        category: 'grass',
        tags: [ 'couch', 'grass', 'santa anna'],
        fullDesc: [
            {
                name: 'description',
                content: `The Santa Ana Couch Grass is an American grass that gives an impressive visual appearance especially when mown short. Santa Ana is a mild seasonal grass with bright green, fine leaves. Despite changes in weather patterns, this color is kept for a long time. Santa grass is typically rough and so makes it the perfect option as couch grass. Santa Ana Couch is a semi-vigorous creeping perennial with runners above ground that can be sustained by bordering into a given area.
                Throughout most areas, Santa Ana Couch grass has the potential to grow well and is hence commonly used. Because it has no issues with discoloration, it is the perfect grass for the beauty of homes around the world. Santa Anna has a strong tolerance for damage and an outstanding ability to rapidly recover. This variety has strong color retention which gives it a superior look.Although other couch types on the market face heat problems, Santa Ana is able to bear the temperatures of the summer. This ensures that even in the heat it will maintain its attractive color. In fact, the couch grass comes out better when grown during a sunny time. Santa Ana is tolerant of snow, as well. This has a short dormancy time during the winter, so the grass won’t lose as much color as the other couches.
                Fine Leaf Warm Season GrassEasy All Round Lawn to MaintainQuick Recovery From Wear and DamageDrought TolerantShade TolerantFor full sunExtremely hard-wearingDrought tolerant
                 
                These recommendations are for established lawns only, to ensure good health and the best possible color year-round. These recommendations are averages and should be used as a guide. Situations vary according to soil conditions, location, water pressure, etc. The visual appearance of your lawn will become your best guide.                
                `
            },
        ],
    },
    {
        id: 'nidfnnidf03j4e',
        name: 'Sir Walter Buffalo',
        price: 16,
        unit: 'm',
        stock: 0,
        shortDesc: `Sir Walter buffalo grass is a premium choice. In the lawn, as it was cultivated and adapted as a tough buffalo turf specifically for the harsh Australian environment by an Australian turf farmer.  Sir Walter Buffalo’s blades are smooth, long, and dark green. This is an all-seasons beautiful lawn. This is active in winter and thus retains its fresh green color longer than other types of buffalo.`,
        sku: 'SWB',
        category: 'grass',
        tags: [],
        fullDesc: [
            {
                name: 'description',
                content: `Sir Walter Buffalo 
                Sir Walter buffalo grass is a premium choice. Its blades are smooth, long, and dark green. This is an all-seasons beautiful lawn. This is active in winter. And thus retains its fresh green color longer than other types of buffalo. In the winter months, it won’t go purple. it is a slow grower and has great durability.
                It works well in the sun and partial shade and is perfect to avoid unwanted weeds. Buffalo is a perfect choice for children and pets and is on the market’s most environment-friendly turfgrass.
                Sir Walter DNA Buffalo Certified is low maintenance, non-invasive, and of great regenerative efficiency. It will thrive also with minimal water requirements in our harsh, hot climate. The great Aussie backyard grass is Sir Walter DNA Certified, as it adapts remarkably in all conditions.
                Buffalo deserves a total of four hours of direct daily sunshine. It has phenomenal maintenance of winter shading and great resistance to pests and diseases. Buffalo requires supplements with fertilizer.
                What are the key features and benefits?
                Ideal for Perth conditions
                Harvested in our exclusive qwelts
                Backed by our exclusive 10-year warranty
                Extremely drought tolerant
                Grows well in full sun or partial shade
                A tight growth habit holds out most weeds
                Low maintenance – requires minimal mowing
                The surface creeping root system is self-repairing,
                ideal for kids, pets, and activities such as backyard cricket and barbecues
                Weed resistant
                Summer grass with winter dormancy – some color change during the cooler months
                Salt tolerant
                Soft to touch
                Low allergen
                Maintenance:
                Sir Walter Buffalo Certified Turf is a very low-maintenance grass. Enjoy more time relaxing in your yard than managing it as Sir Walter is quick repairing and non-invasive. Flourishing in as little as three hours of sunlight a day, Sir Walter’s broad leaves are well equipped for our short winter days. With its deep-growing roots, Sir Walter draws moisture from the soil, making it able to withstand our blistering summers. Its tight growth habit not only provides great-looking coverage but also holds off most weeds and won’t grow into your garden beds.
                We are providing the best turf service in Australia.
                For More Information, Connect with Our Facebook Page.
                `
            },
        ],
    },
    {
        id: 'n6703j4e',
        name: 'Baileys 3.1.1 Plus',
        price: 40,
        unit: 'm',
        stock: 0,
        shortDesc: `Bailey’s Fertilisers is a WA-based company that has been producing high-quality lawn fertilisers for many years, and the newly released Baileys 3.1.1, a great new fertiliser. Plus is micro-granulated, which means the granules fall into and under the grass leaves, reaching the soil and dissolving more quickly with less water. This lawn food also includes Grosorb, which is a terrific idea. Water repellency is a common cause of dry patches, and Grosorb is a great wetting agent. Grosorb has been combined into the fertiliser which is applied at the same time as the fertiliser. Lawns and plants, like people, require regular feeding. Following a 6-8 week feeding schedule, water in the lawn food, and enjoy a beautiful, healthy green lawn.`,
        sku: 'SWB',
        category: 'fertiliser',
        tags: ['fertiliser', 'granulated', 'grosorb', 'wetting agent'],
        fullDesc : [{
            name: 'description',
            content: ''
        },{
            name: 'additionalInfo',
            content: ''
        }]
    },
    {
        id: 'n6709n94e',
        name: 'Eco-Prime Emerald NPK Fertiliser',
        price: 65,
        unit: 'm',
        stock: 0,
        shortDesc: `Rock Mineral Lawn Fertiliser with soil microbes for lawns that are thick, green & water efficient. Eco Prime Emerald Mini Prill · Eco Growth Emerald not only has nitrogen, phosphorus and potassium. · Has a 6.5 pH as well as an extreme pH neutralizing ability.`,
        sku: 'FR203',
        category: 'fertiliser',
        tags: [],
        fullDesc : [{
            name: 'description',
            content: ''
        },{
            name: 'additionalInfo',
            content: ''
        }]
    },
]