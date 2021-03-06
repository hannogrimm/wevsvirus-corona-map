const express = require('express')
const dotenv = require('dotenv')
const morgan = require('morgan')
const path = require('path')
const cors = require('cors')

const connectDB = require('./config/db')

// Load env vars
dotenv.config({ path: './config/config.env' })

// Connect Database
connectDB()

const app = express()
app.use(cors())

// Init Middleware
app.use(express.json({ extended: false }))

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'))
}
// Define Routes
app.use('/api/gpspoint', require('./routes/gpspoint'))

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
  // Set static folder
  app.use(express.static('client/build'))

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')))
}

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Backend Server started on port ${PORT}`))

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`)
  // Close server & exit process
  server.close(() => process.exit(1))
})
