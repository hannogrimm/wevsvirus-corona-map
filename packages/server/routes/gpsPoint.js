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

    // db querys for: 1. location
    const queryForLocation = { location: { $geoWithin: { $centerSphere: [location, searchRadiusMiles / earthEqotorialRadius] } } }
    // 2. time
    const queryForTime = { datetime: { $and: [ { timeArrival: { $gte: timeArrival } }, { timeDepature: { $lte: timeDepature } } ] } }
    // 3. infection
    const queryForInfection = { infectionStatus: 'isInfected' }
    
    // final search query
    const finalSearchQuery = queryForLocation + "," + queryForTime + "," + queryForInfection

    // querying db with final 
    const resultLocations = await GpsPointsModel.find(finalSearchQuery)

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
    const { infectionStatus, location, timeArrival, timeDepature } = req.body

    // create new location object
    const location = new GpsPointsModel({
      infectionStatus,
      location,
      timeArrival,
      timeDepature,
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
