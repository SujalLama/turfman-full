import { useSpring, animated } from "@react-spring/web";
import { Link } from 'nextjs13-progress';
import { useInView } from "react-intersection-observer";
import { easings } from '@react-spring/web'

interface IHeroButtonsProps {
    links: {path: string; name: string;}[], 
    view: boolean
}

const animateConfig = {
    easing: easings.linear,
    duration: 1000,
}

export default function HeroButtons({links, view}: IHeroButtonsProps) {
    const [ref] = useInView({
        triggerOnce: false,
        threshold: 0.2,
      });
    
      const animation = useSpring({
        from: { opacity: 0 },
        to: {opacity: view ? 1 : 0},
        delay: 1500,
        config: animateConfig,
      });

  return (
    <animated.div ref={ref} style={animation} >
        {
            links.map((link, i) => {
                const className = [
                    'bg-primary hover:bg-gray-darker transition-all ease-in-out duration-500 text-white tracking-[1px] font-medium text-sm py-[12px] md:py-[17px] px-5 md:px-[42px] rounded inline-block  font-display mr-7.5',
                    'hidden sm:inline-block bg-primary hover:bg-gray-darker transition-all ease-in-out duration-500 text-white  tracking-[1px] font-medium text-sm py-[12px] md:py-[17px] px-5 md:px-[42px] rounded font-display'
                ]
                return (<Link href={link.path} key={link.path} className={className[i]}>
                            {link.name}
                        </Link>)
            })
        }
    </animated.div>
  )
}
