
//need to be finished:
//check login name and password, and send session number
var express = require('express');
var router = express.Router();
var sha1 = require('sha1'); //sha1 module for hash string


var secret = "qwantechcompany"


var sessions = {}


function isAuthorized(sessionID){

		//check if the sessionID already exists in session object
		var session = sessions[sessionID]
		var sessionReturn
		if(session !== undefined){ //check if there is a session object

			//if so, check if it's still valid, hasn't expired 
			//----------------------------------------------------NEED TO BE FIXED
			if(session.expires < new Date()){ //fix validation on data, expires needs to be < new Date
				sessionReturn = session
			}else{

				sessions[sessionID] = undefined
				sessionReturn = undefined

			}

		}

		return sessionReturn
}

 function login(userID, socialMediaID){
	//create a session object
	var date = new Date()
	var hashSessionID = sha1(userID + socialMediaID + date + secret) //create hash string
	var currentsession

	var sessionReturn 
	//check if the sessionID already exists
	currentsession = isAuthorized(hashSessionID);

	if(currentsession !== undefined) //if session exists
	{
		sessionReturn = currentsession;
	}else
	{	//creates session
		var newsession = {sessionID: hashSessionID, expires :date, userID:userID} //session object
		sessions[hashSessionID] = newsession
		sessionReturn = newsession;
	}
	
	return sessionReturn
}


module.exports = router;
module.exports.login = login;
module.exports.isAuthorized = isAuthorized;
