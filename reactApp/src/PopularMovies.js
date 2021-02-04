import React, {useState, useEffect} from 'react';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import CarouselMovie from './components/Carousel';
import './App.css';
import { Col, Row, Carousel } from 'antd';

function PopularMovies() {
  
  const [movieData, setMovieData] = useState([]);
  const [movieCarousel, setMovieCarousel] = useState([]);

  useEffect( () => {
    
    async function loadMovies() {
      let requete = await fetch("/movies");
      let response = await requete.json();
      setMovieData(response.resultatRequete.results);
      setMovieCarousel([...movieData]);
      
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
  
  movieCarousel.splice(5, 16);
  let movieListCarousel = movieCarousel.map((movie, i) => {
    console.log("coucou");
    let backgroundImgCarousel = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    return(
      <CarouselMovie movieName={movie.title} movieImg={backgroundImgCarousel}/>
    )
  })
  console.log('data',movieData);
  console.log('carousel',movieCarousel);

  return (
    <div style={{marginTop: "2%"}}>
      <Nav/>
      
      <Row style={{marginTop:"3%"}}>
        <Col span={24}>
          <Carousel autoplay>
            
            {movieListCarousel}
            
          </Carousel>
        </Col>
        <Col span={24}>
          <h1 style={{textAlign: "center", marginTop:"20px", color:"white"}}>Films Populaires</h1>
        </Col>
      </Row>
      <Row style={{marginLeft: "5%", marginRight: "5%", marginTop:"5%", display: "flex", justifyContent: "space-between"}}>
        {movieList}
      </Row>
    </div>
  );
}

export default PopularMovies;