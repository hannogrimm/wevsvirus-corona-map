const createError = require("http-errors")

const express = require("express")
const connectDB = require("./config/db")

const path = require("path")
const cookieParser = require("cookie-parser")
const logger = require("morgan")

const indexRouter = require("./routes/index")
const usersRouter = require("./routes/users")

const app = express()

// Connect Database
connectDB()

app.use(logger("dev"))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, "public")))

app.use("/", indexRouter)
app.use("/users", usersRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404))
})

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get("env") === "development" ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render("error")
})

app.listen(process.env.PORT || "5000", () => {
  console.log(
    `Running server at http://localhost:${process.env.PORT || "5000"}`
  )
})

module.exports = app
