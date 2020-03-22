const mongoose = require('mongoose')

const GPSPointsSchema = mongoose.Schema({
  isInfected: {
    type: Boolean,
    required: true,
  },
  coordinates: {
    type: [Number],
    required: true,
  },
  /* city: {
    type: String,
    required: true,
  }, */
  postcode: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model('GpsPointsModel', GPSPointsSchema)
