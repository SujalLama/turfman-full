import ImgLink from "@/components/ImgLink";
import SearchForm from "@/forms/SearchForm";
import ImgListView from "@/layouts/ImgListView";
import PageHero from "@/section/PageHero";
import { data, data2, imgLinkData } from "../page";
import CommentForm from "@/forms/CommentForm";
import BlogList from "@/layouts/BlogList";
import Wysiwyg from "@/components/Wysiwyg";
import BlogContentHeader from "@/section/BlogContentHeader";
import SocialIcons from "@/components/SocialIcons";
import RelatedBlogPost from "@/section/RelatedBlogPost";
const pageHeroData = {
  bgImg: {
      src: 'https://theturfman.com.au/wp-content/uploads/2020/09/sir-walter-turf-perth.jpg',
      alt: 'page hero'
  },
  title: 'lawn'
}

const singleBlogData = {
  content: `<p>With the approach of winter, you might be thinking your lawn doesn’t require as much care as it does in other seasons which is not true. During winter, your lawn health goes through a number of changes. Therefore, it is very important to prioritise your winter lawn care routine and put it into action.</p>
  <p>To help you understand what you should and should not be doing for your winter lawn care, we have come up with a few simple lawn care tips from our professionals.</p>
  <p>With the following tips, you can make your lawn healthy and vibrant, all ready for Spring.</p>

  <h3><b>Limit Watering</b></h3>
  
  <p>You don’t have to worry much about watering your lawn in winter unless the lawn looks very dry. If you have to water your lawn, water it in the morning so the excess water can evaporate. Only water when needed, you overwater in winter it might leave the lawn vulnerable to fungi.</p>
  
  <h3><b>Leave your Grass Long</b></h3>
  
  <p>Although your lawn grows slower in winter, you still have to occasionally mow it. Mowing in winter is totally different than during summer. While mowing in winter, it is important that you leave your grass slightly longer to allow photosynthesis and food supply for your lawn. Ensure that your mower blades are adjusted and you have selected the proper mowing height before you start mowing.</p>
  
  <h3><b>Fertilise</b></h3>
  
  <p>In winter, the growth of the lawn slows down however, it does need the supply of necessary nutrients. Ascertain what nutrients are lacking from the soil first and then, use fertilisers such as <a href="https://theturfman.com.au/cart/">Eco-Prime Emerald NPK Fertiliser</a> and <a href="https://theturfman.com.au/product/baileys-3-1-1-plus/">Baileys </a>for green and lush lawn.</p>
  
  <h3><b>Avoid Too Much Lawn Traffic</b></h3>
  
  <p>During winter, the lawns are moist especially if you are having wet weather. Therefore, try to avoid access traffic on your lawn which will allow your lawn to breathe and recover.</p>
  
  <h3><b>Fight Weeds</b></h3>
  
  <p>As your lawn is at its weakest during winter, it gives opportunity to weeds to appear and attack. Not taking any action leads to the growth of the weeds crowding out your lush green lawn. Make sure to spray weed killer that removes the weed without damaging your lawn.</p>
  
  <p>&nbsp;</p>
  <p>Want some more insider information on winter lawn care from the experts?</p>
  <p><a href="https://theturfman.com.au/contact-us/">Contact us</a> today and we’ll help you have a healthy lawn all year round. At The Turfman, we are always happy to help you! Call us – <b>0410752082</b></p>`
}
const blogContentHeaderData = {
  img: {src: "https://theturfman.com.au/wp-content/uploads/2022/06/winter-lawn-care.jpg", alt: "winter-lawn-care"},
  category: 'Turf',
  date: '07 Jun, 2022',
  author: 'truman',
  link: '/',
  comments: 0,
}
const socials = [
  {
      name: 'facebook',
      url: 'https://www.facebook.com/The-Turfmanperth-100268985080254',
      icon: 'faFacebookSquare',
      color: '#3B5998'
  },
  {
      name: 'twitter',
      url: 'https://twitter.com/TurfPerth',
      icon: 'faTwitter',
      color: '#55ACEE'
  },
  {
      name: 'tumblr', 
      url: 'https://www.youtube.com/channel/UCj44fEc_9-1KmfdMhHdW3eg',
      icon: 'faTumblr',
      color: '#2c4762'
  },
  {
      name: 'pinterest', 
      url: 'https://www.instagram.com/turfmanperth/?hl=en',
      icon: 'faPinterestP',
      color: '#cb2027',
  },
];

export default function page() {
  return (
    <main>
      <PageHero  data={pageHeroData} />
      <section className="px-7.5 mx-auto relative z-10 sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px]  xl:px-3.5 xl:max-w-[1200px]">
          <div className="my-25 large:flex large:justify-between large:items-start large:-mx-3.5">
            <div className="mb-20 md:-mx-4 large:w-[67%] large:px-3.5">
                <BlogContentHeader {...blogContentHeaderData} />

                <Wysiwyg className="my-8" content={singleBlogData.content} />

                <div className="pt-8 border-t border-black/10">
                    <SocialIcons data={socials}/>
                </div>
                
                {/* <!--other options--> */}
                <RelatedBlogPost title="Other options" />

                {/* <!--comment section--> */}
                <section className="mb-10 md:mb-0">
                  <h2 className="text-xl mb-2 text-gray-darker font-bold">Leave a Reply</h2>
                  <p className="mb-8">Your email address will not be published. Required fields are marked *</p>

                  <CommentForm />
                </section>
            </div>

            <aside className="large:w-[33%] large:px-3.5">
                <div className="bg-[#f7f9fa] p-6 md:p-10 rounded-[5px]">
                  <SearchForm />
                  <ImgListView title="Other Options Available" lists={data} />
                  <ImgListView title="Products" lists={data2} />
                  <ImgLink {...imgLinkData} />
                </div>
            </aside>
          </div>
      </section>
    </main>
  )
}
