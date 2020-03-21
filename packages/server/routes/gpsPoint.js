const express = require("express")
const router = express.Router()
const { check, validationResult } = require("express-validator/check")

const gpsPoint = require("../models/gpsPoint")

// @route     GET api/gpsPoints
// @desc      Get all users gpsPoints
// @access    Private
router.get("/", async (req, res) => {
  try {
    
    //look 
    const gpsPoints = await gpsPoint.findAll()
    res.json(gpsPoints)
  } catch (err) {
    console.error(err.message)
    res.status(500).send("Server Error")
  }
})

// @route     POST api/gpsPoints
// @desc      Add new gpsPoint
// @access    Private
router.post("/", async (req, res) => {

    try {
      //validate input 
      const gpsPoints = body("gpsPoints").not().isEmpty().string().escape()

      const gpsPoints = new gpsPoint({
        isInfected,
        location,
        coordinates,
        date
      })

      await gpsPoints.save()

      res.status(200).send("GPS Points saved.")
    } catch (err) {
      console.error(err.message)
      res.status(500).send("Server Error")
    }
  }
)


module.exports = router