"use client";

import GoogleMapReact from "google-map-react";

const AnyReactComponent = ({ text } : {text: string;}) => <div>{text}</div>;

export default function Map() {
    const defaultProps = {
        center: {
          lat: 10.99835602,
          lng: 77.01502627
        },
        zoom: 11
      };

  return (
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }}
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}
      >
        <AnyReactComponent
          
          text="My Marker"
        />
      </GoogleMapReact>
  )
}
