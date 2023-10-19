"use client";

import { MutableRefObject, useEffect, useState } from "react";

export default function useObservable(ref: MutableRefObject<HTMLDivElement | null>) {
  const [startAnimation, setStartAnimation] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Initialize the Intersection Observer
    const options: IntersectionObserverInit = {
      root: null, // Use the viewport as the root
      rootMargin: '0px',
      threshold: 0.5, // When 50% of the component is visible
    };

    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect(); // Stop observing once it's visible
      }
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  useEffect(() => {
    if (isVisible && !startAnimation) {
      // Trigger the animation when the component is visible
      setStartAnimation(true);
    }
  }, [isVisible, startAnimation]);

  return [];
}
