"use client";

import GoogleMapReact from "google-map-react";
import { FaMapMarkerAlt } from "react-icons/fa";

const AnyReactComponent = ({ text } : {text: string;}) => <div>{text}</div>;

export default function Map() {
    const defaultProps = {
        center: {
          lat: -31.9514,
          lng: 115.8617
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
