const express = require('express')
const router = express.Router()
require('express-validator')

const GpsPointsModel = require('../models/gpspoint')

router.get('/', async (req, res) => {
  console.log('getting gpsPoint')

  try {
    // request data from client
    const { location } = req.body

    // query db for coordinates where infected 
    const foundLocations = await GpsPointsModel.find({ infectionStatus: 'isInfected', location }) 

    // send response array
    res.json(foundLocations)

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
