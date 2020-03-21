import React, {
  useEffect,
  useState
} from "react";

const API_KEY = process.env.REACT_APP_HERE_API_KEY ?
  process.env.REACT_APP_HERE_API_KEY :
  "unknown";

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
      defaultLayers.vector.normal.map, {
        center: {
          lat: lat,
          lng: lng
        },
        zoom: zoom
      }
    );

    var ui = window.H.ui.UI.createDefault(map, defaultLayers);

    var mapEvents = new window.H.mapevents.MapEvents(map);

    // Add event listener:
    map.addEventListener('tap', function (evt) {

      var coord = map.screenToGeo(evt.currentPointer.viewportX,
        evt.currentPointer.viewportY);

      console.log("Clicked at: ", coord['lat'], coord['lng']);
    });


    // Instantiate the default behavior, providing the mapEvents object:
    var behavior = new window.H.mapevents.Behavior(mapEvents);

  }, [lat, lng, zoom]);
  return <div id = "here-map"
  style = {
    {
      width: "100%",
      height: "500px"
    }
  }
  />;
};

export default Map;