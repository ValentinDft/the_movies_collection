import React from 'react';
import cardMovie from './components/cardMovie';
import './App.css';
import { Col, Row } from 'antd';

function App() {
  return (
    <div style={{marginTop: "2%"}}>
      <Row>   
        <Col span={6}>
          <h1 style={{textAlign: "center", color: "white"}}>The Movies Collection</h1>
        </Col>
        <Col span={12} style={{display: "flex", justifyContent: "center"}}>
          <ul className="menu-bar">
            <li>Home</li>
            <li>Movies</li>
            <li>TV Show</li>
          </ul>
        </Col>
      </Row>
      <Row>
        <Col>
          <cardMovie/>
        </Col>
      </Row>
    </div>
  );
}

export default App;
