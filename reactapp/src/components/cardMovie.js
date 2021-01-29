import React from "react";
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';

function cardMovie(props) {
    return(
        
        <Col xs={18} md={11} lg={10} xl={7} className="card-portfolio">
            <img src={props.movieImg} style={{width: "100%" ,borderRadius: "10px"}}></img>
            <h2 style={{marginTop: "15px", textAlign: "center"}}>{props.movieName}</h2>
            <h3 style={{fontSize: "15px", marginTop: "15px", padding:"0px 20px", textAlign: "justify", marginBottom: "50px"}}>
                {props.movieDesc}
            </h3>
            <h4 style={{position: "absolute", top: "90%"}}>Moyenne : {props.movieNote}/10</h4>
            <h4 style={{position: "absolute", top: "90%", right: "10px"}}>Date de sortie : {props.movieDate}</h4>
           
        </Col>
        
    )
}

export default cardMovie;   