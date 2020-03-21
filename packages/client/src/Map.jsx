import React, {
  useEffect,
  useState
} from "react";

const API_KEY = process.env.REACT_APP_HERE_API_KEY ?
  process.env.REACT_APP_HERE_API_KEY :
  "unknown";

function reverseGeocode(platform, coord) {
  var geocoder = platform.getGeocodingService(),
    reverseGeocodingParameters = {
      prox: `${coord.lat},${coord.lng}`, // Coords from click event
      mode: 'retrieveAddresses',
      maxresults: '1',
      jsonattributes: 1
    };

  geocoder.reverseGeocode(
    reverseGeocodingParameters,
    onSuccess,
    onError
  );
}

function onSuccess(result) {
  var locations = result.response.view[0].result;
  console.log(locations[0].location.address)
}


function onError(error) {
  alert('Can\'t reach the remote server');
}

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

    window.addEventListener('resize', () => map.getViewPort().resize());
    var ui = window.H.ui.UI.createDefault(map, defaultLayers);

    var mapEvents = new window.H.mapevents.MapEvents(map);

    // Add event listener:
    map.addEventListener('tap', function (evt) {

      var coord = map.screenToGeo(evt.currentPointer.viewportX,
        evt.currentPointer.viewportY);

      console.log("Clicked at: ", coord['lat'], coord['lng']);
      reverseGeocode(platform, coord)
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