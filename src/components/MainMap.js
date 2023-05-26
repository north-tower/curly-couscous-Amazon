import { useState, useEffect } from 'react';
import MapGL, { Marker, Popup } from 'react-map-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

function MainMap({ searchResults }) {
  const [selectedLocation, setSelectedLocation] = useState({});
  const [viewState, setViewState] = useState({
    longitude: 0.1276,
    latitude: 51.5072,
    zoom: 11,
  });

  useEffect(() => {
    // Get user's location using browser's geolocation API
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        // Update the viewState with the user's location
        setViewState((prevState) => ({
          ...prevState,
          latitude,
          longitude,
        }));
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );
  }, []);

  return (
    <MapGL
      {...viewState}
      onViewportChange={(newViewState) => setViewState(newViewState)}
      width={800}
      height={600}
      mapStyle="mapbox://styles/miki007/clgcabeu3001m01mmogi3u0wv"
      mapboxApiAccessToken={process.env.mapbox_key}
    >
      {/* Display user's location as a marker */}
      <Marker
        longitude={viewState.longitude}
        latitude={viewState.latitude}
        offsetLeft={-20}
        offsetTop={-10}
      >
        <div>You are here</div>
      </Marker>
    </MapGL>
  );
}

export default MainMap;
