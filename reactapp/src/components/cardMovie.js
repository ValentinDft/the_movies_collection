import React from "react";
import { Col, Row } from 'antd';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
function cardMovie(props) {

    let moyenne = parseInt(props.movieNote) ;
    let nbVote = parseInt(props.movieVote) ;
    let tabStars = [];
    let nomBtn = props.movieName;
    if (nomBtn.length > 15) {
        nomBtn = nomBtn.slice(0,15)+"...";
    }
    console.log(nomBtn.length);
    for(var i=0;i<10;i++){
     
        var color = {}
    
        
        
        if(i < moyenne){
            color = {color: '#f1c40f'}
        }
        // On ajoute aux tableaux les étoiles
        tabStars.push(<FontAwesomeIcon style={color} icon={faStar} /> )
    }

    return(
         
        <Col xs={18} md={11} lg={10} xl={7} className="card-portfolio">
            <img src={props.movieImg} style={{width: "100%" ,borderRadius: "10px"}}></img>
            <h2 className="club">{props.movieName}</h2>
            <h3 style={{fontSize: "15px", marginTop: "15px", padding:"0px 20px", textAlign: "justify", marginBottom: "50px"}}>
                {props.movieDesc}
            </h3>
            <Row>
                <h4>{tabStars} ({nbVote})</h4>
                <h4>Date de sortie : {props.movieDate}</h4>
            </Row>
            <Row style={{marginTop:"20px"}}>
                <Col span={24} style={{display: "flex", justifyContent: "center"}}>
                    <a href={props.movieUrl} target="_blanck" data-sm-link-text={nomBtn} className="btn effect04"><span>Voir la fiche</span></a> 
                </Col>
            </Row>
            
        </Col> 
    )
}

export default cardMovie;   