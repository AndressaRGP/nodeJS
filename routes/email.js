var express = require('express');
var router = express.Router();
var nodemailer = require("nodemailer")

// create reusable transport method (opens pool of SMTP connections)
var smtpTransport = nodemailer.createTransport("SMTP",{
    service: "Gmail",
    auth: {
        user: "info.workshape@gmail.com",
        pass: "FAmilyof5"
    }
});

var emailErrorHandling = function(error, response){
    if(error){
        console.log(error);
    }else{
        console.log("Message sent: " + response.message);
    }

    // if you don't want to use this transport object anymore, uncomment following line
    //smtpTransport.close(); // shut down the connection pool, no more messages
}

var sendEmails = function(emails, mailOptions, emailErrorHandling){
	for (var i = emails.length - 1; i >= 0; i--) {
		console.log("sending emails email = ", emails[i])
		mailOptions.to = emails[i]
		smtpTransport.sendMail(mailOptions, emailErrorHandling);
	};
}

router.post('/', function (req, res) {
	// console.log(');
	

	var body = req.body
	var userName = body.name
	var mailOptions = {
	    from: "Workshape <info.workshape@gmail.com>", // sender address
	    subject: "Hello ✔", // Subject line
	    text: "Hello world ✔", // plaintext body
	    html: "Hello <b>"+userName+"</b>,<br/><br/>Your account has been created successfully.<br/><br/>Workshape." // html body
	}

	console.log('Trying to send an email');
	console.log(body)

	if (body.hasOwnProperty("email")) {
		var email = body.email
		mailOptions.to = email
		console.log("Email found " + email )
		// setup e-mail data with unicode symbols

		// send mail with defined transport object
		smtpTransport.sendMail(mailOptions, emailErrorHandling);
	}

	if(body.hasOwnProperty("emails")){
		var emails = body.emails
		sendEmails(emails, mailOptions, emailErrorHandling)
	}

	res.send( {"hello" : "world"})
});

module.exports = router;
