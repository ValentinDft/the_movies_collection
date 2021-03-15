import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import CarouselMovie from './components/Carousel';
import './App.css';
import { Col, Row, Carousel, Pagination, Spin   } from 'antd';
import {Animated} from "react-animated-css";
import AOS from "aos";
import "aos/dist/aos.css";

function PopularMovies(props) {
  
  const [onPageMovie, setOnPageMovie] = useState(true);
  const [onPageSerie, setOnPageSerie] = useState(false);
  const [movieData, setMovieData] = useState([]);
  const [movieDataPage1, setmovieDataPage1] = useState([]);
  const [movieDataPage2, setmovieDataPage2] = useState([]);
  const [movieDataPage3, setmovieDataPage3] = useState([]);
  const [statePagination, setStagePagination] = useState(1);
  const [pageB, setPageB] = useState({
		minValue: 0,
		maxValue: 10,
	});

  // Spin
  const [afficheSpiner, setAfficheSpiner] = useState(false);
  let spiner;
  if (afficheSpiner) {
    spiner = <Spin size="large"/>
  }
  
  useEffect( () => {
    setAfficheSpiner(true);
    async function loadMovies() {
      let requete = await fetch(`/movies`);
      let response = await requete.json();
      setMovieData(response[0].page1);
      setmovieDataPage1(response[0].page1);
      setmovieDataPage2(response[1].page2);
      setmovieDataPage3(response[2].page3);
      setAfficheSpiner(false);
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
    window.scrollTo(0, 620);
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
    if (page == 1) {
      setMovieData([...movieDataPage1])
    } else if (page == 2) {
      setMovieData([...movieDataPage2])
    } else if (page == 3) {
      setMovieData([...movieDataPage3])
    }
  };

  return (
    <div style={{marginTop: "2%"}}>
      <Nav/>
      
      <Row style={{marginTop:"3%"}}>
        <Col span={24} style={{display: "flex", justifyContent: "center"}}>
          {spiner}
        </Col>
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
        <Col span={24} style={{display: "flex", justifyContent: "center", marginTop: "40px", marginBottom: "100px"}}>
          <div data-aos="fade-down">  
            <Pagination current={statePagination} onChange={onChange} total={30} />
          </div>
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