import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";

const Map = ({ lng, lat }) => {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    mapboxgl.accessToken = "pk.eyJ1IjoibWlraTAwNyIsImEiOiJjbGNxNHd2aGkwMmg1M29reWd2ZGJod2M1In0.f9-OPY7z8IFoBGwdM7zUZw"; // Replace with your Mapbox access token

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [lng, lat],
      zoom: 12,
    });

    new mapboxgl.Marker().setLngLat([lng, lat]).addTo(map);

    return () => {
      map.remove();
    };
  }, [lng, lat]);

  return <div ref={mapContainerRef} style={{ height: "400px" }} />;
};

export default Map;
