var express = require('express');
var router = express.Router();
var sessionOBJ = require('./session')

var users = [{}]	//start at 1, for boolean sanity , array
var facebookUsers = {}  // = new Object()
var twitterUsers = {}
var googleUsers = {}

//must exist an array of teams 

router.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

var updateSocialBacklinks = function (user) {
	var userID = user.userID
	var socialMediaID 
	var fbUID = user.fbUID
	var twitterUID = user.twitterUID
	var googleUID = user.googleUID
	
	if (fbUID) {
	log.d("users","saving user "+userID+" with Facebook token "+fbUID)
		facebookUsers[fbUID] = userID
		socialMediaID = fbUID;
	}
	
	if (twitterUID) {
		twitterUsers[twitterUID] = userID
		socialMediaID = twitterUID
	}
	
	if (googleUID) {
		googleUsers[googleUID] = userID
		socialMediaID = googleUID
	}

	return socialMediaID
}


router.post('/', function (req, res) {
	// post for create a user or login
	
	var user = req.body 
	
	log.d("users",user);

	log.d("users","firstname:",user.firstName);
	log.d("users","lastname:",user.lastName);

	log.d("users","fbUID", user.fbUID);
	log.d("users","twitterUID", user.twitterUID);
	log.d("users","googleUID", user.googleUID);

	// console.log(req.body.hasOwnProperty('username'));

	// res.send(JSON.stringify({status:"created"}));
	var fbUID = user.fbUID
	var twitterUID = user.twitterUID
	var googleUID = user.googleUID
	var socialMediaID
	var currentSession 
	
	var userID = facebookUsers[fbUID] || twitterUsers[twitterUID] || googleUsers[googleUID]	//TODO: make sure these are all the same
	
	if (userID === undefined) { // 
		log.i("users","Creating new user")
		user.userID = users.length
		users.push(user)
		userID = users.length-1
		
		log.d("users","update backlinks")
		socialMediaID =  updateSocialBacklinks(user)
		
		currentSession =  sessionOBJ.login(userID, socialMediaID);
		res.send({"status":"created", "userID":userID, 
			"sessionID": currentSession.sessionID,
			"expires" : currentSession.expires});

		//Create an user and login


	} else { 

		// User already has an account, should do login 
		var user = users[userID]
		 socialMediaID =  updateSocialBacklinks(user);
		currentSession = sessionOBJ.login(userID, socialMediaID);
		res.send({"status":"logged", "userID":userID, 
			"sessionID": currentSession.sessionID, 
			"expires" : currentSession.expires});
		
	}
});

router.get('/:id', function(req,res) {
	var userID = parseInt(req.params.id)
	log.d("users","getting user by id",userID,users.length)
	var user = users[userID]
	if (userID && user) {
		res.send(user)
	} else {
		res.send(404,{"status":"user not found"})
	}
})

router.put('/:id', function(req,res) {
	var userID = parseInt(req.params.id)
	var user = users[userID]
	if (userID && user) {
		for (var i in req.body) {
			user[i] = req.body[i]
			updateSocialBacklinks(user)
		}
	} else {
		res.send(404,{"status":"user not found"})
	}
})

module.exports = router;


