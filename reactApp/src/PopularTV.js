import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import CarouselMovie from './components/Carousel';
import './App.css';
import { Col, Row, Carousel } from 'antd';
import {Animated} from "react-animated-css";

function PopularTV(props) {
  
  const [onPageMovie, setOnPageMovie] = useState(props.pageMovie);
  const [onPageSerie, setOnPageSerie] = useState(props.pageSerie);
  const [serieData, setSerieDate] = useState([]);

  if (onPageMovie) {
    setOnPageMovie(false);
    props.onMovie(onPageMovie);
  }

  if (!onPageSerie) {
    setOnPageSerie(true);
    props.onMovie(onPageSerie);
  }

  useEffect( () => {
    
    async function loadMovies() {
      let requete = await fetch("/popular-tv");
      let response = await requete.json();
      setSerieDate(response.resultatRequete.results);
    }
    loadMovies()
  }, []);

  let serieCarousel = [...serieData];

  let serieList = serieData.map((serie, i) => {
    let urlImage = 'https://image.tmdb.org/t/p/w500/'+ serie.backdrop_path
    let desc = serie.overview;
    if (desc.length > 250) {
        desc = desc.slice(0,250)+"...";
    }
    let urlMovieDB;
    if (onPageSerie) {
      urlMovieDB = "https://www.themoviedb.org/tv/" + serie.id + "-" + serie.name + "?language=fr"
    }
    return(
      <CardMovie movieName={serie.name} movieDesc={desc} movieDate={serie.first_air_date} movieNote={serie.vote_average} movieImg={urlImage} movieId={serie.id} movieUrl={urlMovieDB}/>
    )
  })

  serieCarousel.splice(5, 16);
  let serieListCarousel = serieCarousel.map((movie, i) => {
    let backgroundImgCarousel = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    return(
      <CarouselMovie movieName={movie.name} movieImg={backgroundImgCarousel}/>
    )
  })
  console.log("onMovie tv",onPageMovie);
  console.log("onSerie tv", onPageSerie);
  return (
    <div style={{marginTop: "2%"}}>
      <Nav/>
      <Row style={{marginTop:"3%"}}>
        <Col span={24}>
          <Animated animationIn="slideInUp">
            <Carousel autoplay>
              {serieListCarousel}
            </Carousel>
          </Animated>
        </Col>
        <Col span={24}>
          <h1 style={{textAlign: "center", marginTop:"40px", color:"white"}}>Séries TV Populaires</h1>
        </Col>
      </Row>
      <Row style={{marginLeft: "5%", marginRight: "5%", marginTop:"5%", display: "flex", justifyContent: "space-between"}}>
        {serieList}
      </Row>
    </div>
  );
}

function mapStateToProps(state) {
  return { pageMovie: state.onMovie, pageSerie: state.onSerie }
}

function mapDispatchToProps(dispatch) {
	return {
		onMovie: function (onPageMovie) {
			dispatch({ type: 'onMoviePage', onPageMovie});
		},
    onSerie: function (onPageSerie) {
			dispatch({ type: 'onSerie', onPageSerie});
		}
	};
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(PopularTV);