import { useSpring, animated } from '@react-spring/web';
import { useInView } from 'react-intersection-observer';
import { easings } from '@react-spring/web'

const animateConfig = {
  easing: easings.easeInBack
}

export default function HeroSubtitle({subTitle, view}: {subTitle: string; view: boolean;}) {
    const [ref] = useInView({
        triggerOnce: false,
        threshold: 0.2,
      });
    
      const animation = useSpring({
        from: { transform: 'translateX(-100%)', opacity: 0 },
        to: { transform: view ? 'translateX(0%)' : 'translateX(-100%)', opacity: view ? 1 : 0},
        delay: 500,
        animateConfig,
      });

  return (
    <div className='overflow-hidden'>
        <animated.span 
            ref={ref}
            style={animation}
            className="hidden sm:inline-block font-display mb-5 text-[0.93rem] 
            tracking-[4px] font-bold uppercase bg-white text-[rgb(34,34,34)] py-[5px] px-3.5">
                <span>{subTitle}</span>
        </animated.span> 
    </div>
  )
}
