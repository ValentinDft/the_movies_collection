import React, {useState, useEffect} from 'react';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import CarouselMovie from './components/Carousel';
import './App.css';
import { Col, Row, Carousel } from 'antd';

function PopularTV() {
  
  const [serieData, setSerieDate] = useState([]);

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
    return(
      <CardMovie movieName={serie.name} movieDesc={desc} movieDate={serie.first_air_date} movieNote={serie.vote_average} movieImg={urlImage}/>
    )
  })

  serieCarousel.splice(5, 16);
  let serieListCarousel = serieCarousel.map((movie, i) => {
    console.log("coucou");
    let backgroundImgCarousel = 'https://image.tmdb.org/t/p/w500/'+ movie.backdrop_path
    return(
      <CarouselMovie movieName={movie.name} movieImg={backgroundImgCarousel}/>
    )
  })

  return (
    <div style={{marginTop: "2%"}}>
      <Nav/>
      <Row style={{marginTop:"3%"}}>
        <Col span={24}>
          <Carousel autoplay>
            {serieListCarousel}
          </Carousel>
        </Col>
        <Col span={24}>
          <h1 style={{textAlign: "center", marginTop:"20px", color:"white"}}>Séries TV Populaires</h1>
        </Col>
      </Row>
      <Row style={{marginLeft: "5%", marginRight: "5%", marginTop:"5%", display: "flex", justifyContent: "space-between"}}>
        {serieList}
      </Row>
    </div>
  );
}

export default PopularTV;