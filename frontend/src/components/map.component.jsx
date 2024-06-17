import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

// load API key
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// debugging log
console.log("Google Maps API Key:", process.env.REACT_APP_GOOGLE_MAPS_API_KEY);

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 1.429406,
  lng: 103.835936
};

function MapComponent() {
  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={16}
      >
        <Marker position={center} />
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent;