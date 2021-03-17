import React from "react";
import './Loading.css';
import { Col, Row, Spin   } from 'antd';

function Loading() {
    
    return (
        <Row className="load">
            <h1 className="yes">The Movies Collection</h1>
            <Col span={24} style={{display: "flex", justifyContent: "center"}}>
                <Spin size="large"/>
            </Col>
            
        </Row>
      
    );
  }
  
  export default Loading;