"use client";

import { useState, useEffect } from 'react';

function useIsVisible(ref: React.RefObject<HTMLDivElement>) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const div = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.5 }
    );

    if(div) {
      observer.observe(div);
    }
    
    return () => {
      if (div) {
        observer.unobserve(div);
      }
    };
  }, [ref]);

  return isVisible;
}

export default useIsVisible;
