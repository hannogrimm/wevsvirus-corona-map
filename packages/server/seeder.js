const fs = require('fs')
const mongoose = require('mongoose')
const dotenv = require('dotenv')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Load models
const GpsPointsModel = require('./models/gpspoint')

// Connect to DB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
})

// Read JSON files
const gpsPoints = JSON.parse(fs.readFileSync(`${__dirname}/_data/gpsPoints.json`, 'utf-8'))

// Import into DB
const importData = async () => {
  try {
    await GpsPointsModel.create(gpsPoints)

    console.log('Data Imported...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// Delete data
const deleteData = async () => {
  try {
    await GpsPointsModel.deleteMany()

    console.log('Data Destroyed...')
    process.exit()
  } catch (err) {
    console.error(err)
  }
}

// node seeder -x
if (process.argv[2] === '-i') {
  importData()
} else if (process.argv[2] === '-d') {
  deleteData()
}
