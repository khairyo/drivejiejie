import React, { useState, useEffect } from 'react';
import { GoogleMap, Marker, InfoWindow, useJsApiLoader } from '@react-google-maps/api';
import axios from 'axios';
import io from 'socket.io-client';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

// yishun mrt
const center = {
  lat: 1.4296,
  lng: 103.8353,
};

const options = {
  disableDefaultUI: true,
};

const socket = io('http://127.0.0.1:5000'); 

function MapComponent({ searchQuery, searchType }) {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [carparkAvailability, setCarparkAvailability] = useState(null);

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY
  })

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(pos);
          if (map) {
            map.setCenter(pos);
          }
        },
        () => {
          console.error("Error: The Geolocation service failed.");
        }
      );
    } else {
      console.error("Error: Your browser doesn't support geolocation.");
    }
  }, [map]);

  useEffect(() => {
    if (map && searchQuery) {
      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        location: currentLocation || center,
        radius: searchType === 'carpark' ? '2000' : '5000', 
        keyword: searchQuery,
        type: searchType === 'carpark' ? 'parking' : undefined,
      };

      service.nearbySearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          const newMarkers = results.map((place) => ({
            position: place.geometry.location,
            name: place.name,
            address: place.vicinity,
            rating: place.rating || 'N/A',
            phone: place.formatted_phone_number || 'N/A',
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
  }, [map, searchQuery, currentLocation, searchType]);

  useEffect(() => {
    const fetchCarparkAvailability = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:5000/get_carpark_availability');
        setCarparkAvailability(response.data.northpoint_city_south_wing);
      } catch (error) {
        console.error('Error fetching carpark availability:', error);
      }
    };

    fetchCarparkAvailability();
  }, []);

  useEffect(() => {
    socket.on('update_availability', (data) => {
      console.log('Received update from server:', data);
      setCarparkAvailability(data.northpoint_city_south_wing);
    });

    return () => {
      socket.off('update_availability');
    };
  }, []);

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
          phone: place.formatted_phone_number || 'N/A',
          rating: place.rating || 'N/A',
        });
      } else {
        console.error('PlacesService failed to get details due to:', status);
      }
    });
  };

  const handleInfoWindowClose = () => {
    setSelectedMarker(null);
  };

  return isLoaded ? (
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
            <p style={{ margin: '0 0 5px 0', fontSize: '14px' }}>
              Rating: {selectedMarker.rating}
            </p>
            <p style={{ margin: '0', fontSize: '14px' }}>
              Phone: {selectedMarker.phone}
            </p>
            {selectedMarker.name.toLowerCase().includes('northpoint city south wing carpark') && (
              <p style={{ margin: '0', fontSize: '14px' }}>
                Carpark Availability: {carparkAvailability || 'N/A'}
              </p>
            )}
          </div>
        </InfoWindow>
      )}
      {currentLocation && (
        <Marker
          position={currentLocation}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 2,
          }}
        />
      )}
    </GoogleMap>
  ): <></>
}

export default MapComponent;
