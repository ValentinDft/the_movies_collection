import React from "react";
import { Col, Row } from 'antd';
import {Link} from 'react-router-dom';
import {Animated} from "react-animated-css";

function nav() {
    return(
        
        <Row>   
        <Col span={8}>
          <Animated animationIn="fadeInLeft">
            <h1 style={{fontFamily: 'Codystar'}} className="neons"><em>The Movies Collection</em></h1>
          </Animated>
        </Col>
        <Col span={8} style={{display: "flex", justifyContent: "center"}}>
        <Animated animationIn="fadeInDown">
          <ul className="menu-bar">
            <Animated animationIn="bounceInDown">
              <Link to="/">
                <li>Films
                  
                </li> 
              </Link>
              
            </Animated>
            <Animated animationIn="bounceInDown">
              <Link to="/popular-tv"><li>Séries</li> </Link>
            </Animated>
          </ul>
        </Animated>
        </Col>
      </Row>
        
    )
}

export default nav;  