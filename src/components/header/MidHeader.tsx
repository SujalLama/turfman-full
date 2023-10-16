import { faEnvelope, faLocationDot, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";

const midHeaderData = {
  logo: {
    url: 'https://theturfman.com.au/wp-content/uploads/2020/07/Logo.jpeg', 
    title: 'The Turfman Perth', 
    alt: 'The Turfman Perth'
  },
  contacts: [
    {
      title: 'Welshpool',
      detail: '6 Anvil Way',
      icon: 'faLocationDot',
      link: 'https://goo.gl/maps/u2kA7qvJMDfYzLW57'
    },
    {
      title: 'contact@theturfman.com.au',
      detail: 'Office Hour: 10:00am - 4:30pm',
      icon: 'faEnvelope',
      link: 'mailto:contact@theturfman.com.au'
    },
    {
      title: '0410752082',
      detail: 'Free Call',
      icon: 'faPhone',
      link: 'tel:+61410752082'
    },
  ]
}

const FontAwesome : {[id: string] : any} = 
  {
    'faLocationDot': <FontAwesomeIcon icon={faLocationDot} className="text-primary text-3xl mr-6"/>,
    'faEnvelope': <FontAwesomeIcon icon={faEnvelope} className="text-primary text-3xl mr-6"/>,
    'faPhone': <FontAwesomeIcon icon={faPhone} className="text-primary text-3xl mr-6"/>
  }


export default function MidHeader() {
  return (
    <div className="hidden xl:block">
			<div className="mx-auto px-3.5 max-w-full sm:max-w-[540px] md:max-w-[720px] large:max-w-[960px] xl:max-w-[1200px]">
				<div className="flex items-center py-1.5 -mr-10">
                            
              <a href="/" rel="home" className="max-h-25" >
                  <img className="max-h-25" src={midHeaderData.logo.url} alt="The Turfman Perth" height="100px" title="The Turfman Perth" />
              </a> 
    
              <div className="flex items-center ml-auto py-4">

                {
                  midHeaderData.contacts.map((contactItem, index) => {
                    const padding = index == 0 ? 'px-[42px]' : index == 1 ? 'px-[44px]' : 'px-10';
                    return (
                      <a key={contactItem.detail} href={contactItem.link} className={`flex items-center ${padding}`}>
                          
                          {FontAwesome[contactItem.icon]}
                          
                          <span className="leading-[1.1]">
                              <span className="font-bold text-black-light">{contactItem.title}</span><br />
                              <span className="text-gray-text text-[13px] font-display leading-6 font-medium">{contactItem.detail}</span>
                          </span>				
                      </a>
                    )
                  })
                }      
              </div>
				</div>
			</div>
		</div>
  )
}
