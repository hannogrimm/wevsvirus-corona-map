const express = require('express')
const router = express.Router()
require('express-validator')

const GpsPointsModel = require('../models/gpspoint')

router.get('/', async (req, res) => {
  console.log('getting gpsPoint')

  try {
    const gpsPoints = await GpsPointsModel.find()

    res.json(gpsPoints)
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

router.post('/', async (req, res) => {
  console.log('posting gpsPoint', req.body)

  try {
    // request data from client
    const { isInfected, location, coordinates, date } = req.body

    // create new gps point object
    const gpsPoint = new GpsPointsModel({
      isInfected,
      location,
      coordinates,
      date,
    })

    // save object to db
    await gpsPoint.save()

    res.status(200).json('GPS Points saved.')
  } catch (err) {
    console.error(err.message)
    res.status(500).send('Server Error')
  }
})

module.exports = router
