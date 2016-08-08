//load modules
var express = require("express")
var bodyParser = require('body-parser')

var app = express()

app.use(bodyParser.json())
app.use(require("./routes/static"))
app.use(require("./routes/api/api"))


var server = app.listen(3000, function() {
	console.log("connected on port 3000")
})