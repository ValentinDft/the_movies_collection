import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import CarouselMovie from './components/Carousel';
import './App.css';
import { Col, Row, Carousel, Pagination  } from 'antd';
import {Animated} from "react-animated-css";

function PopularMovies(props) {
  
  const [onPageMovie, setOnPageMovie] = useState(true);
  const [onPageSerie, setOnPageSerie] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [statePagination, setStagePagination] = useState(1);
  const [pageB, setPageB] = useState({
		minValue: 0,
		maxValue: 10,
	});
  useEffect( () => {
    
    async function loadMovies() {
      let requete = await fetch("/movies");
      console.log(requete);
      let response = await requete.json();
      console.log(response);
      setMovieData(response.resultatRequetePopulaire.results);
    }
    loadMovies()
  }, []);
  props.onMovie(onPageMovie)
  props.onSerie(onPageSerie)
  let movieCarousel = [...movieData];

  let movieList = movieData.map((movie, i) => {
    let urlImage = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    let desc = movie.overview;
    if (desc.length > 250) {
        desc = desc.slice(0,250)+"...";
    }
    let urlMovieDB;
    if (onPageMovie) {
      urlMovieDB = "https://www.themoviedb.org/movie/" + movie.id + "-" + movie.title + "?language=fr"
    }
    return(
      <CardMovie movieName={movie.title} movieDesc={desc} movieDate={movie.release_date} movieNote={movie.vote_average} movieVote={movie.vote_count} movieImg={urlImage} movieId={movie.id} movieUrl={urlMovieDB}/>
    )
  })

  movieCarousel.splice(5, 16);

  let movieListCarousel = movieCarousel.map((movie, i) => {
    let backgroundImgCarousel = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    return(
      <CarouselMovie movieName={movie.title} movieImg={backgroundImgCarousel}/>
    )
  })

  let onChange = page => {
    console.log("jhgf",page);
    setStagePagination(page);
		if (page <= 1) {
			setPageB({
				minValue: 0,
				maxValue: 10,
			});
		} else {
			setPageB({
				minValue: (page - 1) * 10,
				maxValue: page * 10,
			});
		}
  };

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
      <Row>
        <Col span={24} style={{display: "flex", justifyContent: "center", marginTop: "40px", marginBottom: "40px"}}>
          <Pagination current={statePagination} onChange={onChange} total={30} />
        </Col>
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
			dispatch({ type: 'onSeriePage', onPageSerie});
		}
    
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularMovies);