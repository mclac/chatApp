var db = require("../db")
var mongoose = require("mongoose")

var postSchema = mongoose.Schema({
	username: {type: String, required: true},
	body: {type: String, required: true},
	date: { type: Date, default: Date.now }
})

var Post = mongoose.model("Post", postSchema)

//required in API
module.exports = Post