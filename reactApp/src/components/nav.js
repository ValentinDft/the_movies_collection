import React from "react";
import { Col, Row } from 'antd';
import {Link} from 'react-router-dom';

function nav() {
    return(
        
        <Row>   
        <Col span={7}>
          <h1 style={{textAlign: "center", color: "white", fontFamily: 'Coda Caption'}}>The Movies Collection</h1>
        </Col>
        <Col span={10} style={{display: "flex", justifyContent: "center"}}>
          <ul className="menu-bar">
            <Link to="/"><li>Films</li> </Link>
            <Link to="/"><li>Séries</li> </Link>
          </ul>
        </Col>
      </Row>
        
    )
}

export default nav;  