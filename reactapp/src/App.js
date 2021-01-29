import React, {useState, useEffect} from 'react';
import CardMovie from './components/cardMovie';
import './App.css';
import { Col, Row } from 'antd';

function App() {
  
  const [movieData, setMovieData] = useState([]);

  useEffect( () => {
    
    async function loadMovies() {
      let requete = await fetch("/movies");
      let response = await requete.json();
      setMovieData(response.resultatRequete.results);
    }
    loadMovies()
  }, []);

  console.log(movieData);

  let movieList = movieData.map((movie, i) => {
    return(
      <CardMovie movieName={movie.title} movieDesc={movie.overview} movieDate={movie.release_date} movieNote={movie.vote_average}/>
    )
  })

  return (
    <div style={{marginTop: "2%"}}>
      <Row>   
        <Col span={7}>
          <h1 style={{textAlign: "center", color: "white", fontFamily: 'Coda Caption'}}>The Movies Collection</h1>
        </Col>
        <Col span={10} style={{display: "flex", justifyContent: "center"}}>
          <ul className="menu-bar">
            <li>Home</li>
            <li>Movies</li>
            <li>TV Show</li>
          </ul>
        </Col>
      </Row>
      <Row style={{marginLeft: "10%", marginRight: "10%", marginTop:"8%"}}>
        {movieList}
      </Row>
    </div>
  );
}

export default App;
