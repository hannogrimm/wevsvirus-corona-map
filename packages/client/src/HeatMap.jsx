import React, { useEffect, useState } from 'react'

const API_KEY = process.env.REACT_APP_HERE_API_KEY ? process.env.REACT_APP_HERE_API_KEY : 'unknown'

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

    let xhr = new XMLHttpRequest()
    xhr.responseType = 'json'
    xhr.open('POST', 'http://localhost:5000/api/gpspoint/getnearby')
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
    xhr.onreadystatechange = () => {
      let transformedPoints = []
      if (!!xhr.response) {
        console.log(xhr.response)
        xhr.response.forEach((item, index) => {
          let coor = item.location.coordinates
          transformedPoints.push({
            lat: coor[0],
            lng: coor[1],
          })
        })
        heatmapProvider.addData(transformedPoints)
      }
    }
    xhr.send(JSON.stringify({ coordinates: [52.519481921511876, 13.416734005820842] }))

    map.addLayer(new window.H.map.layer.TileLayer(heatmapProvider))

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
