const mongoose = require('mongoose')

const GPSPointsSchema = mongoose.Schema({
  infectionStatus: {
    type: String,
    default: 'isInfected', //else: maybeInfected, notInfected
  },
  location: {
      type: "Point",
      coordinates: { 
        longitude: Number, 
        latitude: Number 
      }
  },
  datetime: {
    type: Date
  }
})

module.exports = mongoose.model('GpsPointsModel', GPSPointsSchema)
