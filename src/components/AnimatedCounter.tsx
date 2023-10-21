'use client';

import CountUp from "react-countup";

function AnimatedCounter ({endValue, duration=1} : {endValue: number; duration?: number;}) {
  return (
    <CountUp end={endValue} duration={duration} scrollSpyOnce enableScrollSpy separator=""/>
  )
}

export default AnimatedCounter;
