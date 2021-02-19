import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import CarouselMovie from './components/Carousel';
import './App.css';
import { Col, Row, Carousel, Pagination } from 'antd';
import {Animated} from "react-animated-css";

function PopularTV(props) {
  
  const [onPageMovie, setOnPageMovie] = useState(props.pageMovie);
  const [onPageSerie, setOnPageSerie] = useState(props.pageSerie);
  const [serieData, setSerieDate] = useState([]);
  const [serieDataPage1, setSerieDatePage1] = useState([]);
  const [serieDataPage2, setSerieDatePage2] = useState([]);
  const [serieDataPage3, setSerieDatePage3] = useState([]);
  const [statePagination, setStagePagination] = useState(1);
  const [pageB, setPageB] = useState({
		minValue: 0,
		maxValue: 10,
	});

  if (onPageMovie) {
    setOnPageMovie(false);
    props.onMovie(onPageMovie);
  }

  if (!onPageSerie) {
    setOnPageSerie(true);
    props.onMovie(onPageSerie);
  }

  useEffect( () => {
    
    async function loadSeries() {
      let requete = await fetch(`/popular-tv`);
      let response = await requete.json();
      setSerieDate(response[0].page1);
      setSerieDatePage1(response[0].page1);
      setSerieDatePage2(response[1].page2);
      setSerieDatePage3(response[2].page3);
    }
    loadSeries()
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
      <CardMovie movieName={serie.name} movieDesc={desc} movieDate={serie.first_air_date} movieNote={serie.vote_average} movieVote={serie.vote_count} movieImg={urlImage} movieId={serie.id} movieUrl={urlMovieDB}/>
    )
  })

  serieCarousel.splice(5, 16);
  let serieListCarousel = serieCarousel.map((movie, i) => {
    let backgroundImgCarousel = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    return(
      <CarouselMovie movieName={movie.name} movieImg={backgroundImgCarousel}/>
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
      setSerieDate([...serieDataPage1])
    } else if (page == 2) {
      setSerieDate([...serieDataPage2])
    } else if (page == 3) {
      setSerieDate([...serieDataPage3])
    }
  };

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
			dispatch({ type: 'onSerie', onPageSerie});
		}
	};
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(PopularTV);