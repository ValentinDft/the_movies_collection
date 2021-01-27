import React from 'react';
import CardMovie from './components/cardMovie';
import './App.css';
import { Col, Row } from 'antd';

function App() {
  let card;
  for (let i = 0; i < 5; i++) {
    card = <CardMovie/>
  }

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
        {card}
      </Row>
    </div>
  );
}

export default App;
