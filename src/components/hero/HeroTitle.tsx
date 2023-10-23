"use client";

import { useSpring, animated } from "@react-spring/web";
import { useInView } from "react-intersection-observer";
import { easings } from '@react-spring/web'

const animateConfig = {
  easing: easings.easeInOutBack
}


export default function HeroTitle({title, view = true}: {title: string; view: boolean;}) {
    
    const [ref] = useInView({
        triggerOnce: false,
        threshold: 0.2,
      });
    
      const animation = useSpring({
        from: { transform: 'translateX(-100%)', opacity: 0 },
        to: { transform: view ? 'translateX(0%)' : 'translateX(-100%)', opacity: view ? 1 : 0},
        delay: 1000,
        animateConfig
      });

  return (
       <div className="leading-[1.24] mb-[26px] font-bold text-[clamp(1rem,10vw,4.0625rem)] text-white overflow-hidden">
            <animated.div 
                ref={ref}
                dangerouslySetInnerHTML={{__html: title}} 
                style={animation}
            >
            </animated.div>
        </div>
  )
}

// import { useInView } from "react-intersection-observer";

// interface IEntry extends IntersectionObserverEntry {
//     isVisible: boolean;
// }
// export default function HeroTitle({title}: {title: string;}) {
//     const [ref, inView, entry] = useInView({
//         threshold: 0.2,
//         trackVisibility: true,
//         delay: 100, // Adjust as needed (e.g., when 20% of the component is in view)
//       });
    
//       const animation = useSpring({
//         from: { transform: 'translateX(-100%)' },
//         to: { transform: inView ? 'translateX(0%)' : 'translateX(0%)'},
//       });

//   return (
//     <h1 
//         className="leading-[1.24] mb-[26px] font-bold text-[clamp(1rem,10vw,4.0625rem)] text-white overflow-hidden" 
//         >
//             <animated.div ref={ref} dangerouslySetInnerHTML={{__html: title}} style={animation}></animated.div>
//     </h1>
//   )
// }
