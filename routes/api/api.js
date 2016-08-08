var router = require("express").Router()
var bodyParser = require("body-parser")

//import model
var Post = require("../../models/postSchema")

router.get("/posts", function(req, res) {
	Post.find().exec(function(err, doc) {
		if (err) {return console.error(err)}
		res.json(doc).status(200)
	})
})

router.post("/posts", function(req, res) {
	var userPost = new Post(req.body)
	userPost.save(function(err, doc) {
		if (err) {return console.error(err)}
		res.json(doc).status(201)
	})
})

router.get("/posts/:id", function(req, res) {
	Post.findOne({_id: req.params.id}, function(err, doc) {
		if (err) {return console.error(err)}
		res.json(doc).status(200)
	})
})

router.put("/posts/:id", function(req, res) {
	Post.findOneAndUpdate({_id: req.params.id}, req.body, function(err, doc) {
		if (err) {return console.error(err)}
		res.json(doc).status(201)
	})
})

router.delete("/posts/:id", function(req, res) {
	Post.findOneAndRemove({_id: req.params.id}, function(err) {
		if (err) {return console.error(err)}
		res.status(204).end()
	})
})

module.exports =  router