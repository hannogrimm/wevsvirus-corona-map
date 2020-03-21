var express = require("express")
var router = express.Router()

/* GET home page. */
router.get("/", function(req, res, next) {
  res.json("Hello Corona and anothr Test")
})

module.exports = router
