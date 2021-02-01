require('dotenv').config();
var express = require('express');
var request = require("sync-request");
var router = express.Router();

var KEY_MOVIEDB = process.env.KEY_MOVIEDB;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/movies', function(req, res, next) {
  
  let requete = request("GET", "https://api.themoviedb.org/3/movie/popular?api_key=" + KEY_MOVIEDB + "&language=fr&sort_by=popularity.desc");
  let resultatRequete = JSON.parse(requete.getBody());
 
  res.json( { resultatRequete });
});

router.get('/popular-tv', function(req, res, next) {
  
  let requete = request("GET", "https://api.themoviedb.org/3/tv/popular?api_key=" + KEY_MOVIEDB + "&language=fr");
  let resultatRequete = JSON.parse(requete.getBody());
 
  res.json( { resultatRequete });
});

module.exports = router;
