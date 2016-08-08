var express = require("express")
var router  = express.Router()

router.use(express.static(__dirname + "/../public"))
router.use("/views", express.static(__dirname + "/../views"))

router.get("/", function (req, res) {
  res.render("index.html.ejs")
})

module.exports = router