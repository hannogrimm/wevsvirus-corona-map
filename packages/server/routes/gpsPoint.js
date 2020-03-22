const express = require('express')
const router = express.Router()
require('express-validator')

const GpsPointsModel = require('../models/gpspoint')

router.get('/', async (req, res) => {
  console.log('getting gpsPoint')

  try {
    // request data from client body
    const { location, timeArrival, timeDepature } = req.body

    // define earth radius +
    const earthEqotorialRadius = 3963.2
    // search radius
    const searchRadiusMiles = 2.5 

    // query db for:
     const resultLocations = await GpsPointsModel.find( 
        // time in between arrival and departure
        { datetime: { $in: [ timeArrival, timeDepature ] } }, 
        // only infected locations
        { infectionStatus: "isInfected" }, 
        // in 2.5 mile range of req. location
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
    const { infectionStatus, location, datetime } = req.body

    // create new location object
    const location = new GpsPointsModel({
      infectionStatus,
      location,
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
