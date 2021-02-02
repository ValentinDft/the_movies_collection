import React, {useState, useEffect} from 'react';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import './App.css';
import { Col, Row } from 'antd';

function PopularMovies() {
  
  const [movieData, setMovieData] = useState([]);

  useEffect( () => {
    
    async function loadMovies() {
      let requete = await fetch("/movies");
      let response = await requete.json();
      console.log(response);
      setMovieData(response.resultatRequete.results);
    }
    loadMovies()
  }, []);

  let movieList = movieData.map((movie, i) => {
    let urlImage = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    let desc = movie.overview;
    if (desc.length > 250) {
        desc = desc.slice(0,250)+"...";
    }
    return(
      <CardMovie movieName={movie.title} movieDesc={desc} movieDate={movie.release_date} movieNote={movie.vote_average} movieImg={urlImage}/>
    )
  })

  return (
    <div style={{marginTop: "2%"}}>
      <Nav/>
      <Row style={{marginTop:"5%", display: "flex", justifyContent: "center"}}>
        <h1>Films Populaires</h1>
      </Row>
      <Row style={{marginLeft: "5%", marginRight: "5%", marginTop:"5%", display: "flex", justifyContent: "space-between"}}>
        {movieList}
      </Row>
    </div>
  );
}

export default PopularMovies;