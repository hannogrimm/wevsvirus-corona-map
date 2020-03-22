import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from "i18next";
const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

var gpsPoints = []

function reverseGeocode(platform, coord, ui, t) {
  var geocoder = platform.getGeocodingService(),
    reverseGeocodingParameters = {
      prox: `${coord.lat},${coord.lng}`, // Coords from click event
      mode: 'retrieveAddresses',
      maxresults: '1',
      jsonattributes: 1
    };

  geocoder.reverseGeocode(
    reverseGeocodingParameters,
    (result) => {
      var locations = result.response.view[0].result;
      console.log(locations[0]);
      addLocationBubble(locations[0].location, ui, t);
  },

    onError
  );
}

function onSuccess(result) {
  var locations = result.response.view[0].result
  gpsPoints[gpsPoints.length - 1].locationData = locations
  console.log(locations[0].location.address)
  console.log(gpsPoints)
}

function addLocationBubble(location, ui, t){
  var date = new Date();
  var day = date.getDate()
  var month = date.getMonth()+1;
  if(day < 10){
    day = `0${day}`
  }
  if(month < 10){
    month = `0${month}`
  }
  var bubble = new window.H.ui.InfoBubble({ lng: location.displayPosition.longitude, lat: location.displayPosition.latitude }, {
    content: `<div class="add-location-overlay">
    <p>${location.address.label}</p>
    <form>
    <label for="time">${t("date")}</label>
    <input name="date" id="date-${location.displayPosition.longitude}-${location.displayPosition.latitude}" type="date" value="${date.getFullYear()}-${month}-${day}"></input><br>
    <label for="arrival">${t("arrivalTime")}</label>
    <input name="arrival" id="arrival-${location.displayPosition.longitude}-${location.displayPosition.latitude}" type="time" value="${date.getHours()}:${date.getMinutes()}"></input>
    <label for="departure">${t("departureTime")}</label>
    <input name="departure" id="departure-${location.displayPosition.longitude}-${location.displayPosition.latitude}" type="time" value="${date.getHours()}:${date.getMinutes()}"></input>

    <button id="btn-${location.displayPosition.longitude}-${location.displayPosition.latitude}">${t("addToTimeline")}</button>
    </form>
    </div>`
    // 
    // 
 });
  
  ui.addBubble(bubble);
  var button = document.getElementById(`btn-${location.displayPosition.longitude}-${location.displayPosition.latitude}`)
  button.addEventListener("click", (e) => addToTimeline(e, location.displayPosition));
}
function addToTimeline(e, position) {
  e.preventDefault();
  console.log(e);
  var date = document.getElementById(`date-${position.longitude}-${position.latitude}`).value;
  var departure = document.getElementById(`departure-${position.longitude}-${position.latitude}`).value;
  var arrival = document.getElementById(`arrival-${position.longitude}-${position.latitude}`).value;
  var timeArrival = new Date(`${date} ${arrival}`);
  var timeDeparture = new Date(`${date} ${departure}`);
  var arrivalString = `${timeArrival.getFullYear()}-${timeArrival.getMonth()+1 < 10 ? '0'+Number(timeArrival.getMonth()+1):timeArrival.getMonth()+1}-${timeArrival.getDate()+1 < 10 ? '0'+Number(timeArrival.getDate()+1):timeArrival.getDate()+1}T${timeArrival.getHours()}:${timeArrival.getMinutes()}:00.000Z`;
  var departureString = `${timeDeparture.getFullYear()}-${timeDeparture.getMonth()+1 < 10 ? '0'+Number(timeDeparture.getMonth()+1):timeDeparture.getMonth()+1}-${timeDeparture.getDate()+1 < 10 ? '0'+Number(timeDeparture.getDate()+1):timeDeparture.getDate()+1}T${timeDeparture.getHours()}:${timeDeparture.getMinutes()}:00.000Z`;
  var gpsPoint = {
    "infectionStatus": true,
    "location": {
      "coordinates": {
        "longitude": position.longitude,
        "latitude:": position.latitude
      }
    },
    "timeArrival": arrivalString,
    "timeDeparture": departureString
   // 2020-03-20T07:31:00.548Z
  }
  gpsPoints.push(gpsPoint);
  console.log(gpsPoint)
}
function onError(error) {
  alert("Can't reach the remote server")
}

const ClickableMap = () => {
  //const t = this.props.t
  const { t } = useTranslation()
  const [lng, setLng] = useState(13)
  const [lat, setLat] = useState(52.5)
  const [zoom, setZoom] = useState(9)

  useEffect(() => {
    const platform = new window.H.service.Platform({
      apikey: API_KEY,
    })

    const defaultLayers = platform.createDefaultLayers()

    const map = new window.H.Map(document.getElementById('here-map'), defaultLayers.vector.normal.map, {
      center: {
        lat: lat,
        lng: lng,
      },
      zoom: zoom,
    })

    window.addEventListener('resize', () => map.getViewPort().resize())

    var mapUILng = i18n.language;
    if (mapUILng.search("de") >= 0){
      mapUILng = "de-DE";
    } else if ((mapUILng.search("en") >= 0)){
      mapUILng = "en-US";
    }

    var ui = window.H.ui.UI.createDefault(map, defaultLayers, mapUILng)

    var mapEvents = new window.H.mapevents.MapEvents(map)


    // Add event listener:
    map.addEventListener('tap', function(evt) {
      var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY)

      console.log('Clicked at: ', coord['lat'], coord['lng'])
      gpsPoints.push({ lat: coord['lat'], lng: coord['lng'] })
      //heatmapProvider.addData([coord])
      reverseGeocode(platform, coord, ui, t)
    })

    // Instantiate the default behavior, providing the mapEvents object:
    var behavior = new window.H.mapevents.Behavior(mapEvents)
  }, [lat, lng, zoom])
  return (
    <div style={{ justifyContent: 'center' }}>
      <div
        id="here-map"
        style={{
          margin: 'auto',
          width: '80%',
          height: '70vh',
        }}
      />
    </div>
  )
}

export default ClickableMap
