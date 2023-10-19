'use client';

import { useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import useObservable from '@/hooks/useObservable';

function AnimatedCounter({endValue = 100, duration = 1000} : {endValue: number; duration?: number;}) {
  const ref = useRef<HTMLDivElement>(null);

  const [] = useObservable(ref)

  const config = { from: { number: 0 }, to: { number: endValue }, config: {duration} };

  const { number } = useSpring(config);


  return (
    <div ref={ref}>
      <animated.span>
        {number.to((val: number) => val.toFixed(0))}
      </animated.span>
    </div>
  );
}

export default AnimatedCounter;
