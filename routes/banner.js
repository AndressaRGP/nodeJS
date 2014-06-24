// banner.js

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:id', function(req, res) {
	console.log("banner: " + req.params.id)
  res.render('banner', { banner: req.params.id });
});

module.exports = router;