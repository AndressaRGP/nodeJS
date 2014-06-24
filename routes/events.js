var express = require('express');
var router = express.Router();

var events = []	//events are stored by timestamp
//var nextEvent = new Date().getTime()

/*
router.post('/', function (req, res) {
	console.log(req.param("sessionID"));

	// Access JSON
	// var body = JSON.parse(req.body);

	// console.log(JSON.stringify(body));

	if(req.param("sessionID") !== 'undefined') {
		res.send({"challengeID":"ghfsdgfdsgfds"});
	} else {
		res.status(406);
		res.send("Error deciphering content")
	}
})
*/

router.get('/next', function (req, res) {
	var currentTime = new Date()
	var eventID = events.length-1
	var nextEvent = events[events.length-1] || {time:0}
	var timeDelta = nextEvent.time - currentTime.getTime()
	if (timeDelta < 0) {
		var nextHour = currentTime.getHours() + 1
		var nextEventTime = new Date(currentTime.getFullYear(), currentTime.getMonth(), currentTime.getDate(), nextHour, 0, 0)
		nextEvent = {id:events.length, type:"running",users:{},numberOfUsers:0,complete:false, time:nextEventTime.getTime()}
		events.push(nextEvent)
	}
	log.d("events","sending next event")
	res.send({"eventID":nextEvent.id, "type":nextEvent.type, "numberOfUsers":nextEvent.numberOfUsers, "complete":nextEvent.complete, time:nextEvent.time})
});

router.post('/:id/data', function (req, res) {
	log.d("events","getting data" + req.params.id)
	var event = events[parseInt(req.params.id)]
	if (event) {
		var userID = req.body.userID
		log.d("events","userID req",userID)
		var user = event.users[userID]
		if (!user) {
			user = 0
			//log.w("events","invalid user")
			//res.send(400,{"status":"invalid user"})
			//return
		}
		var movements = user + req.body.movements
		event.users[userID] = movements
		log.d("events","movements",movements)
		if (movements >= 100) {
			event.complete = true
			event.winner = event.winner || userID
			log.i("events","the race is done!")
		}
		res.send({"complete":event.complete, "winner":event.winner});
	} else {
		log.d("events","bad event data post")
		res.send(400,{"status":"bad event data post"});
	}
});

router.get('/:id', function (req, res) {
	var event = events[req.params.id]
	if (event) {
		if (req.query.details) {
			res.send(event)
		} else {
			res.send({"eventID":event.id, "type":event.type, "numberOfUsers":event.numberOfUsers, "complete":event.complete, "time":event.time});
		}
	} else {
		res.send(400,{"status":"bad event request"});
	}
})

module.exports = router;
