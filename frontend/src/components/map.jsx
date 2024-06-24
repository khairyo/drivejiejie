import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 1.429406,
  lng: 103.835936,
};

const options = {
  disableDefaultUI: true,
};

function MapComponent({ searchQuery }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    if (map && searchQuery) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: searchQuery,
        fields: ['name', 'geometry'],
      };

      service.findPlaceFromQuery(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const newMarkers = results.map((place) => ({
            position: place.geometry.location,
          }));
          setMarkers(newMarkers);
          map.setCenter(results[0].geometry.location);
        } else {
          console.error('PlacesService failed due to:', status);
        }
      });
    }
  }, [map, searchQuery]);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={16}
      options={options}
      onLoad={onLoad}
    >
      {markers.map((marker, index) => (
        <Marker key={index} position={marker.position} />
      ))}
    </GoogleMap>
  );
}

export default MapComponent;
