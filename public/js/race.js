//race.js for node.js

//console.log("hello world");

$("#sailboat1").css({left: "290px", top: "620px", position: "absolute", "z-index": 5})
$("#sailboat2").css({left: "290px", top: "705px", position: "absolute", "z-index": 10})
$("#sailboat3").css({left: "290px", top: "785px", position: "absolute", "z-index": 15})
$("#sailboat4").css({left: "290px", top: "865px", position: "absolute", "z-index": 20})
$("#sailboat5").css({left: "290px", top: "945px", position: "absolute", "z-index": 25})
$("#sailboat6").css({left: "290px", top: "1025px", position: "absolute", "z-index": 30})

$("#conveyorbelt1").css({left: "0px", top: "610px", position: "absolute", "z-index": 5})
$("#conveyorbelt2").css({left: "0px", top: "695px", position: "absolute", "z-index": 10})
$("#conveyorbelt3").css({left: "0px", top: "775px", position: "absolute", "z-index": 15})
$("#conveyorbelt4").css({left: "0px", top: "855px", position: "absolute", "z-index": 20})
$("#conveyorbelt5").css({left: "0px", top: "935px", position: "absolute", "z-index": 25})
$("#conveyorbelt6").css({left: "0px", top: "1015px", position: "absolute", "z-index": 30})

$("#wave2").css({left: "0px", top: "705px", position: "absolute", "z-index": 9})
$("#wave3").css({left: "0px", top: "785px", position: "absolute", "z-index": 14})
$("#wave4").css({left: "0px", top: "865px", position: "absolute", "z-index": 19})
$("#wave5").css({left: "0px", top: "945px", position: "absolute", "z-index": 24})
$("#wave6").css({left: "0px", top: "1025px", position: "absolute", "z-index": 29})
$("#wave1").css({left: "0px", top: "1105px", position: "absolute", "z-index": 35})

var raceID

$.ajax({
	type: "GET",
	url:"events/next",
    //cache: true,
	success:function(data){
		console.log(data)
		raceID = data.eventID
	},
	error: function(){
		console.log("ERROR")
	},
	complete: function(e, status){
		
	}
})

var dist = $(window).width() - 240 
var start = 620
var maxSteps = 100

$(".wave").css("width", $(window).width())

if(raceID !== null){
	window.setInterval(function(){
		$.ajax({
			type: "GET",
			url:"events/" + raceID + "?details=true",
		    //cache: true,
			success:function(data){
				var users = data.users
				console.log(users)
				var count = 1
				for(var i in users){
					// console.log("i=", i)
					var pos = start + dist * (users[i] / maxSteps)
					console.log("pos=", pos, "i=", i)
					$("#sailboat" + count++).css({"left": pos, "transition":"left 1s linear"})
				}
			},
			error: function(e){
				console.log("ERROR", e)
			},
			complete: function(e, status){
				
			}
		})		
	}, 100);
}