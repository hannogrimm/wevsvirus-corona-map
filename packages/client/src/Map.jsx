import React, { useEffect, useState } from "react";

const API_KEY = process.env.REACT_APP_HERE_API_KEY
  ? process.env.REACT_APP_HERE_API_KEY
  : "unknown";

const Map = () => {
  const [lng, setLng] = useState(13);
  const [lat, setLat] = useState(52);
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: API_KEY
    });

    const defaultLayers = platform.createDefaultLayers();

    const map = new window.H.Map(
      document.getElementById("here-map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: lat, lng: lng },
        zoom: zoom
      }
    );
  }, [lat, lng, zoom]);
  return <div id="here-map" style={{ width: "100%", height: "500px" }} />;
};

export default Map;
