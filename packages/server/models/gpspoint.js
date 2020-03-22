const mongoose = require('mongoose')

const GPSPointsSchema = mongoose.Schema({
  infectionStatus: {
    type: String,
    default: 'isInfected', //else: maybeInfected, notInfected
  },
  location: {
    type: 'Point',
    coordinates: [Number],
  },
  startDate: {
    type: Date,
  },
  endDate: {
    type: Date,
  },
})

module.exports = mongoose.model('GpsPointsModel', GPSPointsSchema)
