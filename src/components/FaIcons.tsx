
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
    faUser, 
    IconDefinition, 
    faIdCard, 
    faPhoneVolume, faHandHoldingHeart, faArrowRight, 
    faCartShopping, faEnvelope, faLocationDot, faPhone, faXmark,
    faChevronRight,
    faCalendarDays,
    faComments,
    faPlay, 
} from '@fortawesome/free-solid-svg-icons';
import { faInstagram, faTwitter, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { faFacebookSquare } from "@fortawesome/free-brands-svg-icons/faFacebookSquare";

const faIcons : {[id: string] : IconDefinition}= {
    'faIdCard' : faIdCard,
    'faPhoneVolume' : faPhoneVolume,
    'faHandHoldingHeart' : faHandHoldingHeart,
    'faUser' : faUser,
    'faArrowRight': faArrowRight,
    'faCartShopping' : faCartShopping,
    'faEnvelope': faEnvelope,
    'faLocationDot': faLocationDot,
    'faPhone': faPhone,
    'faXmark': faXmark,
    'faInstagram': faInstagram, 
    'faTwitter': faTwitter, 
    'faYoutube': faYoutube,
    'faFacebookSquare': faFacebookSquare,
    'faChevronRight': faChevronRight,
    'faCalendarDays': faCalendarDays,
    'faComments' : faComments,
    'faPlay': faPlay,
}

export default function FaIcons({icon, className} : {icon: string; className?: string;}) {

  return (
    <FontAwesomeIcon icon={faIcons[icon]} className={className ?? ''} />
  )
}
