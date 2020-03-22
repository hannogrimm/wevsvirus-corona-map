const express = require('express')
const router = express.Router()
const cors = require('cors')
require('express-validator')

const GpsPointsModel = require('../models/gpspoint')

router.use(cors())

router.post('/getnearby', async (req, res) => {
  console.log('getting gpsPoint')

  try {
    // request data from client body
    const { coordinates, userArrived, userLeft } = req.body

    // earth radius 
    const earthEqotorialRadius = 3963.2
    // search radius
    const searchRadiusMiles = 2.5
    
    // final search query
    const finalSearchQuery =    {
      location: { $geoWithin: { $centerSphere: [ coordinates, 5/3963.2 ] } }
    }

    // { timeArrival: { $gte: userArrived } }

    // querying db with final 
    const resultLocations = await GpsPointsModel.find(finalSearchQuery)

    // send response array as json
    res.json(resultLocations)

  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post('/new', cors(corsOptionsDelegate), async (req, res) => {
  try {
    // request data from client
    const { infectionStatus, location, timeArrival, timeDepature } = req.body

    // create new location object
    const newLocation = new GpsPointsModel({
      infectionStatus,
      location,
      timeArrival,
      timeDepature,
    })

    // save object to db, return 200
    await newLocation.save()
    res.status(200).json('Location saved.')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
