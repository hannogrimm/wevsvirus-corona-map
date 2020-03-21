import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [lng, setLng] = useState(13);
  const [lat, setLat] = useState(52);
  const [zoom, setZoom] = useState(8);

  useEffect(() => {
    var platform = new window.H.service.Platform({
      apikey: process.env.REACT_APP_HERE_API_KEY
    });

    var defaultLayers = platform.createDefaultLayers();

    var map = new window.H.Map(
      document.getElementById("here-map"),
      defaultLayers.vector.normal.map,
      {
        center: { lat: lat, lng: lng },
        zoom: zoom
      }
    );
  }, []);
  return <div id="here-map" style={{ width: "100%", height: "500px" }} />;
}

export default App;
