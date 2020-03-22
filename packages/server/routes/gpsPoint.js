const express = require('express')
const router = express.Router()
require('express-validator')

const GpsPointsModel = require('../models/gpspoint')

router.get('/', async (req, res) => {
  console.log('getting gpsPoint')

  try {
    // request data from client
    const { location, timeArrival, timeDepature } = req.body

    // define earth radius & search radius 
    const earthEqotorialRadius = 3963.2
    const searchRadiusMiles = 2.5 

    // query db for time range, infected & in radius of location
     const resultLocations = await GpsPointsModel.find( 
        { datetime: { $in: [ timeArrival, timeDepature ] } }, 
        { isInfected: true}, 
        { location: { $geoWithin: { $centerSphere: [ location, searchRadiusMiles/earthEqotorialRadius ] } }
    })

    // send response array
    res.json(resultLocations)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post('/', async (req, res) => {

  try {
    // request data from client
    const { infectionStatus, coordinates, datetime } = req.body

    // create new location object
    const location = new GpsPointsModel({
      infectionStatus,
      coordinates,
      datetime
    })

    // save object to db, return 200
    await location.save()
    res.status(200).json('Location saved.')

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
