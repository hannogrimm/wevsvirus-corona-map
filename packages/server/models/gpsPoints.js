const mongoose = require("mongoose")

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  location: {
    // GeoJSON Point
    type: {
      type: String,
      enum: ["Point"],
      required: false
    },
    coordinates: {
      type: [Number],
      required: false,
      index: "2dsphere"
    },
  type: {
    type: String,
    default: "personal"
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("contact", ContactSchema)
