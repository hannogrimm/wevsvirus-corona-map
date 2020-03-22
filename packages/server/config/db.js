const mongoose = require('mongoose')

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    })

    console.log('MongoDB Connected...')
  } catch (err) {
    console.log('could not connect')
    console.error(err.message)
    process.exit(1)
  }
}

module.exports = connectDB
