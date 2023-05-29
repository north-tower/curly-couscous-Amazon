import React, { useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const GeolocationExample = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [pinLocation, setPinLocation] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(showPosition);
    } else {
      document.getElementById("demo").innerHTML = "Geolocation is not supported by this browser.";
    }
  };

  const showPosition = (position) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    setCurrentLocation({ lat: latitude, lng: longitude });
    document.getElementById("demo").innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;
  };

  const handlePinLocation = (e) => {
    const { lng, lat } = e.lngLat;
    setPinLocation({ lat, lng });
    setCurrentLocation({ lat, lng });
  };

  return (
    <div>
      <h1>Geolocation Example</h1>
      <p id="demo">Click the button to get your location.</p>
      <button onClick={getLocation}>Get Location</button>
      <div style={{ height: "400px" }}>
        <MapboxMap currentLocation={currentLocation} pinLocation={pinLocation} onPinLocation={handlePinLocation} />
      </div>
      {pinLocation && (
        <div>
          <h3>Pinned Location:</h3>
          <p>Latitude: {pinLocation.lat}</p>
          <p>Longitude: {pinLocation.lng}</p>
        </div>
      )}
    </div>
  );
};

const MapboxMap = ({ currentLocation, pinLocation, onPinLocation }) => {
  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoibWlraTAwNyIsImEiOiJjbGNxNHd2aGkwMmg1M29reWd2ZGJod2M1In0.f9-OPY7z8IFoBGwdM7zUZw"; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      container: "map-container",
      style: "mapbox://styles/mapbox/streets-v11",
      center: pinLocation ? [pinLocation.lng, pinLocation.lat] : currentLocation ? [currentLocation.lng, currentLocation.lat] : [0, 0],
      zoom: 12,
    });

    if (currentLocation) {
      new mapboxgl.Marker({ color: "blue" }).setLngLat([currentLocation.lng, currentLocation.lat]).addTo(map);
    }

    if (pinLocation) {
      new mapboxgl.Marker({ color: "red" }).setLngLat([pinLocation.lng, pinLocation.lat]).addTo(map);
    }

    map.on("click", onPinLocation);

    return () => map.remove();
  }, [currentLocation, pinLocation, onPinLocation]);

  return <div id="map-container" style={{ height: "100%" }} />;
};

export default GeolocationExample;
