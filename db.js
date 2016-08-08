var mongoose = require("mongoose")
//connect to db
mongoose.connect("mongodb://localhost/test7")

var db = mongoose.connection 
db.on("error", console.error.bind(console, "connection error:"))
db.once("open", function() {
	console.log("database connection successful")
})

module.exports = mongoose