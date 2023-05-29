import React, { useEffect, useState } from "react";
import Map from "./Map";

const GeolocationExample = () => {
  const [position, setPosition] = useState(null);

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
    setPosition({ lat: latitude, lng: longitude });
    document.getElementById("demo").innerHTML = `Latitude: ${latitude}<br>Longitude: ${longitude}`;
  };

  return (
    <div>
      <h1>Geolocation Example</h1>
      <p id="demo">Click the button to get your location.</p>
      <button onClick={getLocation}>Get Location</button>
      {position && <Map lat={position.lat} lng={position.lng} />}
    </div>
  );
};

export default GeolocationExample;
