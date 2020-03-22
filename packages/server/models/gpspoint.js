const mongoose = require('mongoose')

const GPSPointsSchema = mongoose.Schema({
  infectionStatus: {
    type: String,
    default: 'isInfected', //else: maybeInfected, notInfected (MVP only: "isInfected"!)
  },
  location: {
    type: {
      type: String, 
      enum: ['Point'], 
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  timeArrival: {
    type: Date
  },
  timeDepature: {
    type: Date
  }
})

module.exports = mongoose.model('GpsPointsModel', GPSPointsSchema)
