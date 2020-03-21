const express = require("express")
const router = express.Router()
require("express-validator")

const GpsPointsModel = require("../models/gpsPoints")


router.get("/", async (req, res) => {
  try {
    

    const gpsPoints = await GpsPointsModel.findAll()
    res.json(gpsPoints)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})


router.post("/", async (req, res) => {

    try {
      // request data from client
      const { isInfected, location, coordinates, date } = req.body

      // create new gps point object
      const gpsPoint = new GpsPoint({
        isInfected,
        location,
        coordinates,
        date
      })

      // save object to db
      await gpsPoint.save()

      res.status(200).send("GPS Points saved.")
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)


module.exports = router
