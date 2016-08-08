"use strict"
var app = angular.module("chatApp", ["ngRoute"])

app.config(["$routeProvider", function($routeProvider) {
	$routeProvider.when("/",{
		controller: "showPostsCtrl",
		templateUrl: "views/chatPosts.html"
	})
}])

app.controller("showPostsCtrl", ["$scope", "postSvc", function($scope, postSvc) {
	//var postEditing = false

	postSvc.getPosts()
	.then(function(response) {
		$scope.posts = response.data
	})
	.catch(function(error) {
		$scope.posts = error
	})

	$scope.postComment = function() {
		//turned this into a {object} so its perfectly formatted to transfer
		//this was for view simplicity related reasons
		postSvc.postPosts({
			"username": $scope.commentUser,
			"body": $scope.commentBody
		})
		.then(function(response) {
			$scope.posts.unshift(response.data)
			$scope.commentBody = null
		})
		.catch(function(error) {
			return alert(error)
		})
	}

	$scope.findComment = function(post) {
		var postID = post._id

		postSvc.getSinglePost(postID)
		.then(function(response) {
			return response
		})
		.catch(function(error) {
			return error
		})
	}

	$scope.edit = function(post) {
		//postEditing = true
		//edit function is more complex first it gets a specific comment
		var postID = post._id
		postSvc.getSinglePost(postID)
		.then(function(response) {
			//next it removes what is in the commentBody in the view with what is
			//in the comment selected
			$scope.commentUser = response.data.username
			$scope.commentBody = response.data.body
			//next return the postID so that the next promise can use it
			return postID
		})
		.then(function(postID) {
			//here this takes the postID from the last promise 
			//then listens for the editButton to be clicked
			document.getElementById('editButton').onclick = function() {

				var comment = {
					"_id": postID,
					"username": $scope.commentUser,
					"body": $scope.commentBody
				}
				console.log(comment)
				postSvc.editPost(postID, comment)
				console.log(this)
			}
		})/*
		.then(function(response) {
			//$scope.posts.unshift(response.data)
			//$scope.commentBody = null
		})*/
		.catch(function(error) {
			return error
		})
	}

	$scope.submitEdit = function() {
		/*
		var comment = {
			"username": $scope.commentUser,
			"body": $scope.commentBody
		}

		return comment*/
	}

	$scope.delete = function(post) {
		//find post based on id
		var postID = post._id
		//call the postSvc and delete it on the db
		postSvc.deletePost(postID)
		.then(function(response) {
			//delete the post in the view if successful
			var postIndex = $scope.posts.indexOf({ postID })
			$scope.posts.splice(postIndex, 1)
			return response
		})
		.catch(function(error) {
			return error
		})
	}

}])

app.service("postSvc", ["$http", function($http) {
	this.blankFunction = function() {
		return console.log("blankFunction envoked")
	}

	this.getPosts = function() {
		return $http.get("/posts")
		.then(function(response) {
			return response
		})
		.catch(function(error) {		
			return error
		})
	}
	this.postPosts = function(post) {
		//with this I can use the returned post object 
		//and put it where I want unshift it
		return $http.post("/posts", post)
		.then(function(response) {
			return response
		})
		.catch(function(error) {
			return error
		})
	}

	this.getSinglePost = function(postID) {
		var url = "/posts/" + postID

		return $http.get(url)
		.then(function(response) {
			return response
		})
		.catch(function(error) {
			return error
		})
	}

	this.editPost = function(postID, post) {
		//meh
		console.log(postID)
		console.log(post)
		var url = "/posts/" + postID

		return $http.put(url, post)
		.then(function(response) {
			return response
		})
		.catch(function(error) {
			return error
		})
	}
	this.deletePost = function(postID) {
		var url =  "/posts/" + postID

		return $http.delete(url)
		.then(function(response) {
			return response
		})
		.catch(function(error) {
			return error
		})
	}
}])