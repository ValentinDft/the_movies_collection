import React, {useState, useEffect} from 'react';
import CardMovie from './components/cardMovie';
import Nav from './components/nav';
import './App.css';
import { Row } from 'antd';

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
  console.log(serieData);

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

  return (
    <div style={{marginTop: "2%"}}>
      <Nav/>
      <Row style={{marginTop:"5%", display: "flex", justifyContent: "center"}}>
        <h1>Séries TV Populaires</h1>
      </Row>
      <Row style={{marginLeft: "5%", marginRight: "5%", marginTop:"5%", display: "flex", justifyContent: "space-between"}}>
        {serieList}
      </Row>
    </div>
  );
}

export default PopularTV;