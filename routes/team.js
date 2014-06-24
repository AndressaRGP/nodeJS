//receive team name, and one email
//post request

var express = require('express'); // use express frmework
var sha1 = require('sha1'); //sha1 module for hash string

var router = express.Router(); 
var sessionOBJ = require('./session');

var teams = {} //array of teams, OBJ? 
var teamPlayers = []

router.all('/', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
 });

router.post('/', function (req, res){
  //POST teams/?session=12312312312312321
       
       var sessionID = req.query.sessionID  // to get variable form URL is "req.query" 

           var session = sessionOBJ.isAuthorized(sessionID);

            var team = req.body;

    
            var teamName = team.teamName;
            var adminID = session.userID; 
            var teamPlayerID = session.userID;
            
            
            if(teamName != null  && adminID != null)
            {
                var teamID = sha1(new Date() + teamName + "asecret") //creates teamID with hash
                team.teamID = teamID //put parameter to team
                teams[teamID] = team // array teams receives team OBJ in teamID position
                teamPlayers.push(teamPlayerID) //add teamPlayerID to the vector of teamPayes

                res.send({"status" : "Created", "teamID" : team.teamID, "adminID":adminID });
                log.d("Created", "Team ID" + team.teamID)
                log.d("TeamPlayers", teamPlayers)
            
            } else {
                res.send(400, {"status" : "failed", "body": req.body});
            
            }
            
            });
///team/a121312?sessionID=1231232 
//------PUT Request, edit team Information
 router.put('/:teamID', function (req, res){
        
        //Verify put request listener sintax 

          var teamID = req.params.teamID
          var sessionID = req.query.sessionID

          var session = sessionOBJ.isAuthorized(sessionID); // get the session OBJ

          var currentUserID = session.userID //get the userID in sesisonOBJ

          var team = req.body

          var teamName = team.teamName
          var teamCharity = team.teamCharity
          var teamDescription = team.teamDescription


            log.d("TeamInfo", teamName  )

            log.d("TeamInfo Charity", teamCharity  )

            log.d("TeamInfo Description", teamDescription )
            //send a vector of users
            log.d("TeamInfo adminID", currentUserID  )

            res.send({"status":"Edited", "teamName": teamName, "teamID":teamID});


 });
//------Finish Put Request edit Team information


//--------eu mexi aqui trying to get team iDs


router.get('/:id',function(req, res){
           log.d("****** Parameters", req.params.id)
           var teamID = parseInt(req.params.id)
           log.d("trying to get teamID__________")
           
           var team = teams[teamID]
           if(teamID && team){
                res.send(team)
                log.d("******* Team variable", team)
           }
           else{
           res.send(404,{"status":"team not found"})
                }
           
           });



//-------finish mexi

module.exports = router;


