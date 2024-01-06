"use client";

import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Map() {
    const defaultProps = {
        center: {
          lat: -31.991020,
          lng: 115.935130
        },
        zoom: 11
      };

  return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY! }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <FaMapMarkerAlt size="2em" color="red" />
      </GoogleMapReact>
  )
}
