const mongoose = require("mongoose")

const GPSPointsSchema = mongoose.Schema({
  isInfected: {
    type: Boolean,
    required: false
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ['Point'], // 'location.type' must be 'Point'
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("gpsPoints", GPSPointsSchema)
