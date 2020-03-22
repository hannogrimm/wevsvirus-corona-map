import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import i18n from 'i18next'
const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

var gpsPoints = []

function reverseGeocode(platform, coord, ui, t) {
  var geocoder = platform.getGeocodingService(),
    reverseGeocodingParameters = {
      prox: `${coord.lat},${coord.lng}`, // Coords from click event
      mode: 'retrieveAddresses',
      maxresults: '1',
      jsonattributes: 1,
    }

  geocoder.reverseGeocode(
    reverseGeocodingParameters,
    result => {
      var locations = result.response.view[0].result
      console.log(locations[0])
      addLocationBubble(locations[0].location, ui, t)
    },

    onError
  )
}

function onSuccess(result) {
  var locations = result.response.view[0].result
  gpsPoints[gpsPoints.length - 1].locationData = locations
  console.log(locations[0].location.address)
  console.log(gpsPoints)
}

function addLocationBubble(location, ui, t) {
  var bubble = new window.H.ui.InfoBubble(
    { lng: location.displayPosition.longitude, lat: location.displayPosition.latitude },
    {
      content: `<div class="add-location-overlay">
    <p>${location.address.label}</p>
    <label for="time">${t('time')}</label>
    <input name="time" type="time"></input>
    <label for="time">${t('date')}</label>
    <input name="date" type="date"></input>
    <button type="submit">${t('addToTimeline')}</button>
    </div>`,
      //
      //
    }
  )

  ui.addBubble(bubble)
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

    var mapUILng = i18n.language
    if (mapUILng.search('de') >= 0) {
      mapUILng = 'de-DE'
    } else if (mapUILng.search('en') >= 0) {
      mapUILng = 'en-US'
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
  }, [lat, lng, t, zoom])
  return (
    <div style={{ justifyContent: 'center' }}>
      <div
        id="here-map"
        style={{
          margin: '0',
          width: '100%',
          height: '70vh',
        }}
      />
    </div>
  )
}

export default ClickableMap
