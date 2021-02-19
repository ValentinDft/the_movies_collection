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
  let requeteMoviePage1 = request("GET", "https://api.themoviedb.org/3/movie/popular?api_key=" + KEY_MOVIEDB + "&language=fr&sort_by=popularity.desc&page=1");
  let resultatRequeteMoviePopulairePage1 = JSON.parse(requeteMoviePage1.getBody());

  let requeteMoviePage2 = request("GET", "https://api.themoviedb.org/3/movie/popular?api_key=" + KEY_MOVIEDB + "&language=fr&sort_by=popularity.desc&page=2");
  let resultatRequeteMoviePopulairePage2 = JSON.parse(requeteMoviePage2.getBody());

  let requeteMoviePage3 = request("GET", "https://api.themoviedb.org/3/movie/popular?api_key=" + KEY_MOVIEDB + "&language=fr&sort_by=popularity.desc&page=3");
  let resultatRequeteMoviePopulairePage3 = JSON.parse(requeteMoviePage3.getBody());

  let film = [{page1 : resultatRequeteMoviePopulairePage1.results}, {page2 : resultatRequeteMoviePopulairePage2.results}, {page3 : resultatRequeteMoviePopulairePage3.results}]
  res.json( film );
});

router.get('/popular-tv', function(req, res, next) {
  let requeteSeriePage1 = request("GET", "https://api.themoviedb.org/3/tv/popular?api_key=" + KEY_MOVIEDB + "&language=fr&page=1");
  let resultatRequeteSeriePage1 = JSON.parse(requeteSeriePage1.getBody());

  let requeteSeriePage2 = request("GET", "https://api.themoviedb.org/3/tv/popular?api_key=" + KEY_MOVIEDB + "&language=fr&page=2");
  let resultatRequeteSeriePage2 = JSON.parse(requeteSeriePage2.getBody());

  let requeteSeriePage3 = request("GET", "https://api.themoviedb.org/3/tv/popular?api_key=" + KEY_MOVIEDB + "&language=fr&page=3");
  let resultatRequeteSeriePage3 = JSON.parse(requeteSeriePage3.getBody());
 
  let serie = [{page1 : resultatRequeteSeriePage1.results}, {page2 : resultatRequeteSeriePage2.results}, {page3 : resultatRequeteSeriePage3.results}]

  res.json( serie );
});

module.exports = router;
