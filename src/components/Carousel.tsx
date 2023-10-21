"use client";

import { Carousel } from 'react-responsive-carousel';

export default function HeaderCarousel({children} : {children: []}) {
  return (
    <Carousel>
        {children}
    </Carousel>
  )
}
