import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow } from '@react-google-maps/api';
import CloseIcon from '@mui/icons-material/Close';

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
  const [selectedMarker, setSelectedMarker] = useState(null);

  useEffect(() => {
    if (map && searchQuery) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: center,
        radius: '5000',
        keyword: searchQuery,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const newMarkers = results.map((place) => ({
            position: place.geometry.location,
            name: place.name,
            address: place.vicinity,
            rating: place.rating,
            phone: place.formatted_phone_number,
            place_id: place.place_id,
          }));
          setMarkers(newMarkers);
          if (results[0]) {
            map.setCenter(results[0].geometry.location);
          }
        } else {
          console.error('PlacesService failed due to:', status);
        }
      });
    }
  }, [map, searchQuery]);

  const onLoad = (mapInstance) => {
    setMap(mapInstance);
  };

  const handleMarkerClick = (marker) => {
    const service = new window.google.maps.places.PlacesService(map);
    const request = {
      placeId: marker.place_id,
      fields: ['name', 'formatted_address', 'formatted_phone_number', 'rating'],
    };

    service.getDetails(request, (place, status) => {
      if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
        setSelectedMarker({
          position: marker.position,
          name: place.name,
          address: place.formatted_address,
          phone: place.formatted_phone_number,
          rating: place.rating,
        });
      } else {
        console.error('PlacesService failed to get details due to:', status);
      }
    });
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={14}
      options={options}
      onLoad={onLoad}
    >
      {markers.map((marker, index) => (
        <Marker
          key={index}
          position={marker.position}
          onClick={() => handleMarkerClick(marker)}
        />
      ))}
      {selectedMarker && (
        <InfoWindow
          position={selectedMarker.position}
          onCloseClick={handleInfoWindowClose}
        >
          <div style={{ fontFamily: 'var(--font-family)', padding: '10px' }}>
            <h2 style={{ color: 'var(--primary-color)', margin: '0 0 10px 0' }}>{selectedMarker.name}</h2>
            <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>{selectedMarker.address}</p>
            <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>Rating: {selectedMarker.rating}</p>
            <p style={{ margin: '0', fontSize: '14px' }}>Phone: {selectedMarker.phone}</p>
          </div>
        </InfoWindow>
      )}
    </GoogleMap>
  );
}

export default MapComponent;