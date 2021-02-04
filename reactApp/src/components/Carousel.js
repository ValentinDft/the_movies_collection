import React from "react";
import '../App.css';

function CarouselMovie(props) {


    return(
        
        <div style={{display: "flex", flexDirection: "column", alignItems:"center"}}>
            <img src={props.movieImg} className="img-carousel"></img>
            <h2 style={{color: "white", height:"55px"}} >{props.movieName}</h2>
        </div>
        
    )
}

export default CarouselMovie;  