import React, { useEffect, useState } from 'react'

const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

var gpsPoints = []

function reverseGeocode(platform, coord) {
  var geocoder = platform.getGeocodingService(),
    reverseGeocodingParameters = {
      prox: `${coord.lat},${coord.lng}`, // Coords from click event
      mode: 'retrieveAddresses',
      maxresults: '1',
      jsonattributes: 1,
    }

  geocoder.reverseGeocode(reverseGeocodingParameters, onSuccess, onError)
}

function onSuccess(result) {
  var locations = result.response.view[0].result
  gpsPoints[gpsPoints.length - 1].locationData = locations
  console.log(locations[0].location.address)
  console.log(gpsPoints)
}

function onError(error) {
  alert("Can't reach the remote server")
}

const HeatMap = props => {
  const [lng, setLng] = useState(13.3)
  const [lat, setLat] = useState(52.5)
  const [zoom, setZoom] = useState(12)

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
    var ui = window.H.ui.UI.createDefault(map, defaultLayers)

    var mapEvents = new window.H.mapevents.MapEvents(map)

    var heatmapProvider = new window.H.data.heatmap.Provider({
      opacity: 0.6,
      assumeValues: false,
    })

    map.addLayer(new window.H.map.layer.TileLayer(heatmapProvider))

    // Add event listener:
    map.addEventListener('tap', function(evt) {
      var coord = map.screenToGeo(evt.currentPointer.viewportX, evt.currentPointer.viewportY)

      console.log('Clicked at: ', coord['lat'], coord['lng'])
      gpsPoints.push({ lat: coord['lat'], lng: coord['lng'] })
      heatmapProvider.addData([coord])
      reverseGeocode(platform, coord)
    })

    // Instantiate the default behavior, providing the mapEvents object:
    var behavior = new window.H.mapevents.Behavior(mapEvents)
  }, [lat, lng, zoom])
  return (
    <div
      id="here-map"
      style={{
        margin: '0',
        width: props && props.width ? props.width : '100%',
        height: props && props.height ? props.height : '100vh',
      }}
    />
  )
}

export default HeatMap
