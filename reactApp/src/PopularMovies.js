import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import CarouselMovie from './components/Carousel';
import './App.css';
import { Col, Row, Carousel } from 'antd';
import {Animated} from "react-animated-css";

function PopularMovies(props) {
  
  const [onPageMovie, setOnPageMovie] = useState(true);
  const [onPageSerie, setOnPageSerie] = useState(false);
  const [movieData, setMovieData] = useState([]);

  useEffect( () => {
    
    async function loadMovies() {
      let requete = await fetch("/movies");
      console.log(requete);
      let response = await requete.json();
      console.log(response);
      setMovieData(response.resultatRequete.results);
    }
    loadMovies()
  }, []);
  props.onClick(onPageMovie)
  let movieCarousel = [...movieData];

  let movieList = movieData.map((movie, i) => {
    let urlImage = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    let desc = movie.overview;
    if (desc.length > 250) {
        desc = desc.slice(0,250)+"...";
    }
    return(
      <CardMovie movieName={movie.title} movieDesc={desc} movieDate={movie.release_date} movieNote={movie.vote_average} movieImg={urlImage} movieId={movie.id}/>
    )
  })

  movieCarousel.splice(5, 16);

  let movieListCarousel = movieCarousel.map((movie, i) => {
    let backgroundImgCarousel = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    return(
      <CarouselMovie movieName={movie.title} movieImg={backgroundImgCarousel}/>
    )
  })

  return (
    <div style={{marginTop: "2%"}}>
      <Nav/>
      
      <Row style={{marginTop:"3%"}}>
        <Col span={24}>
          <Animated animationIn="slideInUp">
            <Carousel autoplay>
              {movieListCarousel}
            </Carousel>
          </Animated>
        </Col>
        <Col span={24}>
            <h1 style={{textAlign: "center", marginTop:"40px", color:"white"}}>Films Populaires</h1>
        </Col>
      </Row>
      <Row style={{marginLeft: "5%", marginRight: "5%", marginTop:"5%", display: "flex", justifyContent: "space-between"}}>
        {movieList}
      </Row>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
	return {
		onClick: function (onPageMovie) {
			dispatch({ type: 'onMovie', onPageMovie});
		}
	};
}

export default connect(null, mapDispatchToProps)(PopularMovies);