require('dotenv').config();
var express = require('express');
var request = require("sync-request");
var router = express.Router();

var REQUEST_MOVIE = process.env.REQUEST_MOVIE;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/movies', function(req, res, next) {
  
  let requete = request("GET", REQUEST_MOVIE);
  let resultatRequete = JSON.parse(requete.getBody());
 
  res.json( { resultatRequete });
});

module.exports = router;
